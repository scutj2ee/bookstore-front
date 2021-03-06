
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
//登录管理员
export const modifyAdminUser = (state, adminUser) => {
  state.adminUser = adminUser;
}
//提交新的地址
export const modifyAddress = (state, address) => {
  state.address = address;
}
//提交分类号
export const modifyCateId = (state, cate_id) => {
  state.cate_id = cate_id;
}