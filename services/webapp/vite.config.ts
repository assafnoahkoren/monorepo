import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import version from 'vite-plugin-package-version';


export default defineConfig({
    plugins: [
        version(),
        UnoCSS(),
        react()
    ],
})
