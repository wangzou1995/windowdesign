import Vue from 'vue'
import { getUploadFields } from '@/until/pushConfig'
export const gridContainerMutations = {
  /**
   *向表格容器添加元素
   * @param state
   * @param obj
   */
  addGridElementMutation (state, obj) {
    let id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
    let colunmIndex = obj.tb_window_element.length
    let titleName = '标题' + (obj.tb_window_element.length + 1)
    obj.tb_window_element.push(
      {
        tb_window_formatsearch: [],
        asdatasource: false,
        isnullable: true,
        type: 'input',
        title: titleName,
        tb_window_inputfields: [],
        rowid: 0,
        tb_window_element_action: [],
        tb_window_selectfields: [],
        rightmargin: 0,
        readonly: false,
        authcontrol: false,
        istreecolumn: false,
        id: id,
        tag: 0,
        mustsetfiltercon: false,
        createtime: 0,
        columnid: colunmIndex,
        editable: true,
        leftmargin: 0,
        topmargin: 0,
        tb_window_uploadfile: [getUploadFields(id)],
        elementname: '',
        bottommargin: 0,
        astablevar: false,
        containerid: 0,
        updatetime: 0,
        searchop: 'eq',
        elementdesc: '',
        name: '输入框',
        objelement: '',
        labelwidth: 0,
        visible: '',
        elementstatus: '',
        defvalue: '',
        displayformat: null,
        inputmask: null,
        emptytext: null,
        verifytype: null,
        verifyinfo: null,
        groupid: null,
        verifyformula: null,
        parenttype: 'grid',
        parentid: obj.id
      }
    )
    state.currentSelect = obj.tb_window_element[obj.tb_window_element.length - 1]
  },
  /**
   *移除表格容器中的元素
   * @param state
   * @param obj
   */
  removeGridElementMutation (state, obj) {
    Vue.delete(obj.container.tb_window_element, obj.index)
    // 重置坐标
    obj.container.tb_window_element.forEach((e, index) => {
      e.columnid = index
    })
    let elements = obj.container.tb_window_element.length
    if (obj.index - 1 < 0 && elements === 0) {
      state.currentSelect = obj.container
    } else {
      state.currentSelect = obj.container.tb_window_element[((obj.index + 1) >= elements ? obj.index - 1 : obj.index)]
    }
  },
  /**
   * 添加表格工具栏
   * @param state
   * @param obj
   */
  addGridToolMutation (state, obj) {
    if (obj) {
      let id = Date.parse(new Date().toString()) + '_' + Math.ceil(Math.random() * 99999)
      state.currentSelect.tb_tool_element.push(
        {
          name: '工具栏',
          type: 'toolbar',
          icon: 'iconfont iconbiaodan',
          containername: null,
          tb_window_element: [],
          parentid: state.currentSelect.id,
          windowid: null,
          readonly: false,
          containerdesc: null,
          showpage: false,
          loaddata: false,
          checkbox: false,
          pagesize: null,
          datasubmitrange: null,
          id: id,
          createtime: null,
          autosave: false,
          orderid: null,
          gridfilter: false,
          leaf: null,
          containertype: 'toolbar',
          forcefit: false,
          levelid: null,
          layoutalign: null,
          iconcls: null,
          subobjid: null,
          scrollevent: null
        }
      )
    } else {
      Vue.delete(state.currentSelect.tb_tool_element, 0)
    }
  }
}
export const gridContainerActions = {
  addGridElementAction (context, obj) {
    context.commit('addGridElementMutation', obj)
  },
  removeGridElementAction (context, obj) {
    context.commit('removeGridElementMutation', obj)
  },
  addGridToolAction (context, obj) {
    context.commit('addGridToolMutation', obj)
  }
}
