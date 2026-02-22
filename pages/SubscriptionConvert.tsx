import React, { useState } from 'react';
import { ArrowLeft, Copy, Download, RefreshCcw } from 'lucide-react';
import { api } from '../services/api';
import { CreateSubscriptionLinkResponse, SubscriptionConvertResponse } from '../types';

interface SubscriptionConvertProps {
  onBack: () => void;
}

export const SubscriptionConvert: React.FC<SubscriptionConvertProps> = ({ onBack }) => {
  const [sourceUrl, setSourceUrl] = useState('');
  const [result, setResult] = useState<SubscriptionConvertResponse | null>(null);
  const [linkResult, setLinkResult] = useState<CreateSubscriptionLinkResponse | null>(null);
  const [linkTtl, setLinkTtl] = useState<'0' | '86400' | '604800' | '2592000'>('0');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [copyLinkStatus, setCopyLinkStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  const handleConvert = async () => {
    setError(null);
    setResult(null);
    setLinkResult(null);
    setCopyStatus('idle');
    setCopyLinkStatus('idle');
    const url = sourceUrl.trim();
    if (!url) {
      setError('请输入订阅链接。');
      return;
    }

    setIsSubmitting(true);
    try {
      const converted = await api.convertSubscription({
        sourceUrl: url,
        sourceFormat: 'clash',
        targetFormat: 'sing-box',
      });
      setResult(converted);
    } catch (err) {
      const message = err instanceof Error ? err.message : '转换失败，请稍后重试。';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateLink = async () => {
    setError(null);
    setCopyLinkStatus('idle');
    const url = sourceUrl.trim();
    if (!url) {
      setError('请输入订阅链接。');
      return;
    }

    setIsGeneratingLink(true);
    try {
      const expiresInSeconds = Number(linkTtl);
      const link = await api.createSubscriptionLink({
        sourceUrl: url,
        sourceFormat: 'clash',
        targetFormat: 'sing-box',
        expiresInSeconds,
      });
      setLinkResult(link);
    } catch (err) {
      const message = err instanceof Error ? err.message : '生成订阅链接失败，请稍后重试。';
      setError(message);
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.content);
      setCopyStatus('success');
    } catch {
      setCopyStatus('failed');
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result.content], { type: 'application/json;charset=utf-8' });
    const link = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    link.download = 'sing-box-config.json';
    link.click();
    URL.revokeObjectURL(objectUrl);
  };

  const handleCopyLink = async () => {
    if (!linkResult) return;
    try {
      await navigator.clipboard.writeText(linkResult.url);
      setCopyLinkStatus('success');
    } catch {
      setCopyLinkStatus('failed');
    }
  };

  return (
    <div className="bg-[#f0f0f0] min-h-screen pb-10">
      <div className="bg-gradient-to-r from-[#14532d] via-[#166534] to-[#15803d] text-white py-10 px-4 mb-6 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">订阅转换工具</h1>
          <p className="opacity-90 text-sm md:text-base">
            当前仅支持 Clash 订阅链接转换为 sing-box 配置。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[#0056b3] hover:underline font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </button>

        <section className="bg-white rounded border border-gray-200 shadow-sm p-5 md:p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">输入订阅链接</h2>
          <p className="text-sm text-gray-600 mb-3">
            为了安全，链接必须为公网 `http/https` 地址。后端不会记录完整原始链接。
          </p>

          <textarea
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            className="w-full h-32 rounded border border-gray-300 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#166534]"
            placeholder="https://example.com/sub?token=..."
            spellCheck={false}
          />

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={handleConvert}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-[#166534] text-white px-4 py-2 rounded hover:bg-[#14532d] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
              {isSubmitting ? '转换中...' : '开始转换'}
            </button>
            <div className="text-sm text-gray-600 self-center">
              方向：`clash` -&gt; `sing-box`
            </div>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="text-sm font-bold text-gray-800 mb-2">安全订阅链接（推荐）</div>
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={linkTtl}
                onChange={(e) => setLinkTtl(e.target.value as '0' | '86400' | '604800' | '2592000')}
                className="rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="0">永不过期（直到你更换后端密钥）</option>
                <option value="86400">1 天后过期</option>
                <option value="604800">7 天后过期</option>
                <option value="2592000">30 天后过期</option>
              </select>
              <button
                onClick={handleCreateLink}
                disabled={isGeneratingLink}
                className="inline-flex items-center gap-2 border border-[#166534] text-[#166534] px-4 py-2 rounded hover:bg-green-50 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGeneratingLink ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
                {isGeneratingLink ? '生成中...' : '生成安全链接'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              链接中不会暴露原始订阅地址，适合导入客户端使用。
            </p>
          </div>
        </section>

        {error && (
          <section className="bg-red-50 border border-red-200 rounded p-4 text-red-700 text-sm">
            {error}
          </section>
        )}

        {result && (
          <>
            <section className="bg-white rounded border border-gray-200 shadow-sm p-5 md:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">转换结果</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-sm mb-4">
                <div className="bg-gray-50 border border-gray-200 rounded p-3">
                  <div className="text-gray-500">源格式</div>
                  <div className="font-bold">{result.meta.sourceFormat}</div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-3">
                  <div className="text-gray-500">目标格式</div>
                  <div className="font-bold">{result.meta.targetFormat}</div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-3">
                  <div className="text-gray-500">节点数</div>
                  <div className="font-bold">{result.meta.nodeCount ?? '-'}</div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-3">
                  <div className="text-gray-500">耗时</div>
                  <div className="font-bold">{result.meta.elapsedMs} ms</div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-3">
                  <div className="text-gray-500">大小</div>
                  <div className="font-bold">{result.meta.contentBytes} bytes</div>
                </div>
              </div>

              {result.warnings.length > 0 && (
                <div className="mb-4 rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                  <div className="font-bold mb-1">Warnings</div>
                  <ul className="list-disc list-inside space-y-1">
                    {result.warnings.map((warning, idx) => (
                      <li key={`${warning}-${idx}`}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mb-3">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 border border-gray-300 px-3 py-2 rounded hover:bg-gray-50"
                >
                  <Copy className="w-4 h-4" />
                  复制配置
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 border border-gray-300 px-3 py-2 rounded hover:bg-gray-50"
                >
                  <Download className="w-4 h-4" />
                  下载 JSON
                </button>
                {copyStatus === 'success' && (
                  <span className="text-sm text-green-700 self-center">已复制到剪贴板</span>
                )}
                {copyStatus === 'failed' && (
                  <span className="text-sm text-red-700 self-center">复制失败，请手动复制</span>
                )}
              </div>

              <pre className="w-full max-h-[50vh] overflow-auto rounded bg-[#0b1220] text-[#e2e8f0] text-xs p-4 border border-[#1f2937]">
                <code>{result.content}</code>
              </pre>
            </section>
          </>
        )}

        {linkResult && (
          <section className="bg-white rounded border border-gray-200 shadow-sm p-5 md:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">安全订阅链接</h3>
            <div className="rounded border border-gray-200 bg-gray-50 p-3">
              <a href={linkResult.url} target="_blank" rel="noreferrer" className="break-all text-sm text-[#0056b3] hover:underline">
                {linkResult.url}
              </a>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 border border-gray-300 px-3 py-2 rounded hover:bg-gray-50"
              >
                <Copy className="w-4 h-4" />
                复制链接
              </button>
              {linkResult.expiresAt ? (
                <span className="text-sm text-gray-600">过期时间：{new Date(linkResult.expiresAt).toLocaleString()}</span>
              ) : (
                <span className="text-sm text-gray-600">过期时间：不过期</span>
              )}
              {copyLinkStatus === 'success' && (
                <span className="text-sm text-green-700">链接已复制</span>
              )}
              {copyLinkStatus === 'failed' && (
                <span className="text-sm text-red-700">复制失败，请手动复制</span>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SubscriptionConvert;
