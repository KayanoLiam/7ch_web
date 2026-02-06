import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Vite 配置：开发服务器、别名与环境变量注入。
// Vite config: dev server, aliases, and env injections.
export default defineConfig(({ mode }) => {
    // 读取对应模式的环境变量（.env, .env.local 等）。
    // Load env variables for the current mode.
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // 兼容旧代码：在浏览器端注入 API key 常量。
        // Legacy compatibility: inject API key constants on the client.
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
