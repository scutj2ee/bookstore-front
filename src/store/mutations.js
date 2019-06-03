
export const modifyLoginForm= (state, loginForm) => {
  state.loginForm = loginForm;
}

export const modifyRuleForm = (state, ruleForm) => {
  state.ruleForm = ruleForm;
}
//提交分类管理
export const modifyCategories = (state, categories) => {
  state.categories = categories;
}
//登录用户
export const modifyUser = (state, user) => {
  state.user = user;
}
//提交新的地址
export const modifyAddress = (state, address) => {
  state.address = address;
}