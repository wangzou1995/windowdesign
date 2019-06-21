import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Table, Tabs, Modal, Icon, Collapse, Card } from 'ant-design-vue'
import { Container, Header, Main, Aside, Input, Select, Switch, Form,
  Button, FormItem, Option, Radio, RadioGroup, RadioButton, Dialog, Col,
  Row, TabPane, Tabs as ElTab, Message, Divider, Table as ElTable, TableColumn, Tooltip, Checkbox } from 'element-ui'
import { activeColor, containerFilter, tabInContainers, elementTypes, actions } from '@/until/global'
import { getInputFields, isInputElement, getUploadFields, getFormatFields } from '@/until/pushConfig'
import { isInContainer, isInElement } from '@/until/ArrayUntil'
import { titleAnalyticToParams, getJsonParams } from '@/until/ParamsAnalytic'
import { fetch, post } from '@/api/api'
import '@/assets/iconfont/iconfont.css'
import draggable from 'vuedraggable'
import codemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import store from './store'

Vue.config.productionTip = false
Vue.use(draggable)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(Select)
Vue.use(Table)
// Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(Modal)
Vue.use(Radio)
Vue.use(Switch)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Option)
Vue.use(Collapse)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Col)
Vue.use(codemirror)
Vue.use(TabPane)
Vue.use(ElTab)
Vue.use(Divider)
Vue.use(ElTable)
Vue.use(TableColumn)
Vue.use(Card)
Vue.use(Tooltip)
Vue.use(Checkbox)
Vue.prototype.getJsonParams = getJsonParams
Vue.prototype.$activeColor = activeColor
Vue.prototype.getInputFields = getInputFields
Vue.prototype.isInputElement = isInputElement
Vue.prototype.getUploadFields = getUploadFields
Vue.prototype.getFormatFields = getFormatFields
Vue.prototype.isInElement = isInElement
Vue.prototype.isInContainer = isInContainer
Vue.prototype.containerFilter = containerFilter
Vue.prototype.tabInContainers = tabInContainers
Vue.prototype.elementTypes = elementTypes
Vue.prototype.$message = Message
Vue.prototype.titleAnalyticToParams = titleAnalyticToParams
Vue.prototype.actions = actions
Vue.prototype.$fetch = fetch
Vue.prototype.$post = post
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
