import Constants from '@/common/config/config.js'

// 设置分页查询参数
export function setPageParams(params) {
  let pageParam = {};
  if (params && params.current && params.size){
    params = trimData(params);
    pageParam = {pageNo: params.current, pageSize: params.size};
  }
  const defaultPageParams = { pageNo: 1, pageSize: Constants.DEFAULT_PAGE_NUM }
  return { ...defaultPageParams, ...params, ...pageParam }
}

// 请求是否成功
export function isRequestSuccess(response) {
  if (response && response.data && response.data.success === Constants.SUCCESS_FLAG){
    return true
  } else {
    return false
  }
}

// 从请求结果中获取分页数据
export function getPageDataByResponse(response) {
  if (isRequestSuccess(response)) {
    const content = getResponseContent(response);
    if (content) {
      const pageData = {}
      const pagination = {}
      pagination.total = content.total
      pagination.pageSize = content.size
      pagination.current = content.current
      pageData.list = content.records
      pageData.pagination = pagination
      pageData.total = content.total
      return pageData
    } else {
      return content
    }
  } else {
    return {
      list: [],
      pagination: {},
      total: 0
    }
  }
}

// 请求成功时返回请求的内容，否则返回错误提示消息
export function getResponseContent(response) {
  if (isRequestSuccess(response)) {
    if (response.data && response.data.data) {
      return response.data.data
    } else {
      return undefined
    }
  } else {
    return undefined
  }
}

// 清除数据中为undefined和null的值
export function trimData(values) {
  if (values) {
    for (const s in values) {
      if (values[s] === undefined || values[s] === null || values[s] === 'null') {
        delete values[s]
      }
    }
  }
  return values
}

/*
*把json对象转为FormData对象
**/
export function jsonToFormData(inJSON, inTestJSON, inFormData, parentKey) {
  var formData = inFormData || new FormData()
  var testJSON = inTestJSON || {}
  for (var key in inJSON) {
    var constructedKey = key
    if (parentKey) {
      constructedKey = parentKey + '.' + key
    }
    var value = inJSON[key]
    if (value && value.constructor === {}.constructor) {
      jsonToFormData(value, testJSON, formData, constructedKey)
    } else {
      formData.append(constructedKey, inJSON[key])
      testJSON[constructedKey] = inJSON[key]
    }
  }
  return formData
}

// json转url参数
export function parseParamToUrl(param, key) {
  var paramStr = ''
  if (!param) {
    return paramStr
  }
  var paramType = typeof (param)
  if (paramType === 'string' || paramType === 'number' || paramType === 'boolean') {
    paramStr += '&' + key + '=' + encodeURIComponent(param)
  } else if (paramType === 'object') {
    for (var k in param) {
      paramStr += parseParamToUrl(param[k], k)
    }
  }
  return paramStr
}

// 获取选中列的ID,返回ID数组
export function getSelectedKeysByRows(rows, key) {
  let ids = [];
  if (rows && rows.length>0) {
    let selectedLength = rows.length;
    for (let k = 0; k < selectedLength; k++) {
      let selectRow = rows[k];
      ids.push(selectRow[key])
    }
  }
  return ids;
}
// 设置过滤参数
export function setFilterParam(queryParam, filters) {
  if (queryParam && filters){
    for (let key in filters){
      queryParam[key] = filters[key];
    }
  }
}

// 设置排序参数
export function setSortParam(queryParam, prop, order) {
  if (order==='ascending'){
    order = 'asc';
  }
  if (queryParam && order && prop ){
    queryParam['orderColumn'] = prop;
    queryParam['orderBy'] = order;
  } else {
    queryParam['orderColumn'] = undefined;
    queryParam['orderBy'] = undefined;
  }
}

// 判断数组是否存在某个值
export function isArrayContains(arrayList, val) {
  if (arrayList && val !== undefined ){
    var i = arrayList.length;
    while (i--) {
      if (arrayList[i] === val) {
        return true;
      }
    }
  } else {
    return false;
  }
}

/**
 * 给树形中每个对象的prop属性赋值为value
 * @param treeData赋
 * @param prop
 * @param value
 * @returns {Array}
 */
export  function setTreeValOfEach(treeData,prop,value) {
  let tmp = [];
  Array.from(treeData).forEach(function(record) {
    if (record === undefined) {
      return;
    }
    record[prop] = value;

    tmp.push(record)
    if (record.children && record.children.length > 0) {
      const children = setTreeValOfEach(record.children,prop,value)
      tmp = tmp.concat(children)
    }
  });
  return tmp;
}

