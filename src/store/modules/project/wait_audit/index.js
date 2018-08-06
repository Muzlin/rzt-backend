const wait_audit = {
  state: {
    audit_first_search: [], // 初审待提交搜索数据
    audit_first_list: [], // 初审待提交列表
    audit_first_list_loading: false // 列表加载状态
  },
  getters: {
    audit_first_search: state => state.audit_first_search,
    audit_first_list: state => state.audit_first_list,
    audit_first_list_loading: state => state.audit_first_list_loading
  },
  mutations: {
    set_audit_first_search(state, payload) {
      // state.
    }
  }
}
export default wait_audit
