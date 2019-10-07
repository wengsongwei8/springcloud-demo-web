import Constants from '@/common/config/config.js'
import treeToArray from './treeToArray'

export default {
  name: 'TreeGrid',
  componentName: 'TreeGrid',
  props: {
    queryList: Function,
    columns: {
      type: Array,
      default: []
    },
    pageSizes: {
      type: Array,
      default: () => Constants.DEFAULT_PAGES_ARRAY
    },
    paginationAlign: {
      type: String,
      default: 'center'
    },
    hasPagination: {
      type: Boolean,
      default: false
    },
    data: {
      type: [Array, Object],
      required: false
    },
    total: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: 0
    },
    size: {
      type: String,
      default: 'medium' // 列表的大小，有 medium / small / mini
    },
    stripe: {
      type: Boolean,
      default: true // 是否为斑马纹 table
    },
    border: {
      type: Boolean,
      default: true // 是否带有纵向边框
    },
    showHeader: {
      type: Boolean,
      default: true // 是否显示表头
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false // 是否要高亮当前行
    },


    expandAll: { // 树形是否展开全部
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func =  treeToArray
      const args = [tmp, this.expandAll];
      return func.apply(null, args)
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: Constants.DEFAULT_PAGE_NUM
    };
  },
  methods: {
    search() {
      this.handleCurrentChange(1);
    },
    sizeChange(size) {
      this.pageSize = size;
      this.queryList(1, this.pageSize);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.queryList(this.currentPage, this.pageSize);
    },
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(row) {
      row._expanded = !row._expanded
    },
    // 图标显示
    iconShow(record) {
      return ( record.children && record.children.length > 0)
    }
  },

  render(h) {
    const namespace = 'table-grid';
    const { caption, actionBar, ...otherSlots } = this.$slots;
    let columnShowIndex = 0; // 用于控制是否显示树形展开框的索引
    return (
      <div class={namespace}>
        <el-table data={this.formatData} row-style={this.showRow} v-loading={this.loading} size={this.size}
                  stripe={this.stripe} border={this.border} show-header={this.showHeader}
                  highlight-current-row={this.highlightCurrentRow}
          {...{ props: this.$attrs, on: this.$listeners }}>
          {
            Object.entries(otherSlots).map(([key, val]) =>
              <template slot={key}>{val}</template>
            )
          }
          {
            this.columns.map((column, index) => {
              if(index==0){ // 置0重新开始
                columnShowIndex = 0;
              }
              const { formatter, renderBody, isShow } = column;
              if (isShow === false){
                return (
                  <span></span>
                );
              }

              if(!column.type){
                columnShowIndex ++;
              }
              let data = {
                props: {
                  ...column,
                  formatter: formatter && (row => formatter(row[column.prop], row))
                }
              };

              if (renderBody) {
                data.scopedSlots = {
                  default({ row }) {
                    return renderBody(h, row);
                  }
                };
              }
              if(columnShowIndex === 1){
                  data.props.formatter = (row)=>{
                    let colVal = row[column.prop];
                    if(formatter){
                      colVal = formatter(row[column.prop], row);
                    }
                    const level = row['_level'];//树的层级
                    let paddingLeft = (20 * (level-1)) + 'px';
                    const iconShow = this.iconShow(row)
                    let iconClass = row._expanded ?  'el-icon-minus' : 'el-icon-plus';
                    if(iconShow){ // 能展开的情况
                      return (
                        <div>
                          <span  style={{width:paddingLeft,position: 'relative',display: 'inline-block', cursor: 'pointer'}} ></span>
                          <span class="tree-ctrl"  onClick={() => this.toggleExpanded(row) }>
                            <i  class={ iconClass } style={{color: '#41cede', cursor: 'pointer'}} ></i> {colVal}
                          </span>
                        </div>
                      );
                    } else {
                      paddingLeft = (20 * (level-1) + 15) + 'px';
                      return (
                        <div>
                          <div>
                            <span  style={{width:paddingLeft,position: 'relative',display: 'inline-block'}} ></span>
                              {colVal}
                            </div>
                        </div>
                      );
                    }

                  }
              }
              return (
                  <el-table-column {...data}  >
                  </el-table-column>
              );
            })
          }
        </el-table>

        {
          this.hasPagination &&
          <el-pagination class={`el-pagination--${this.paginationAlign}`}
                         current-page={this.currentPage} page-size={this.pageSize} page-sizes={ this.pageSizes}
                         total={this.total} on-current-change={this.handleCurrentChange} on-size-change={this.sizeChange}
                         layout="total,  prev, pager, next, jumper">
          </el-pagination>
        }
      </div>
    );
  }
};
