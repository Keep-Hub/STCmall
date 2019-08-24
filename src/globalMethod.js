export default {
  // 上拉分页方法
  getPageData (currentPage, pageSize, objData) { // 参数1:当前页 参数2:每页展示多少条 参数3: 需要分页的对象
    let totalPage = Math.ceil(objData.length / pageSize) // 先算出一共多少页
    // console.log(currentPage > 0 && currentPage <= totalPage)
    if (currentPage > 0 && currentPage <= totalPage) {
      return objData.slice(pageSize * (currentPage - 1), pageSize * currentPage)
    } else {
      return ['您输入的页码超出范围！']
    }
  }
}
