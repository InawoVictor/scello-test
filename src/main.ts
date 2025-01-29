//ts-nocheck
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const app = createApp(App)

app
.component('EasyDataTable', EasyDataTable)
.mount('#app')
