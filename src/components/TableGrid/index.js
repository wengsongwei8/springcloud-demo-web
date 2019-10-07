import Constants from '@/common/config/config.js'

export default {
  name: 'TableGrid',
  componentName: 'TableGrid',
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
      default: true
    },
    data: {
      type: Array,
      default: []
    },
    total: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
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
    }
  },
  render(h) {
    const namespace = 'table-grid';
    const { caption, actionBar, ...otherSlots } = this.$slots;

    return (
      <div class={namespace}>
        {
          (caption || actionBar) &&
          <div class={`${namespace}__header`}>
            <h1 class={`${namespace}__header__caption`}>{caption}</h1>
            <div class={`${namespace}__header__action-bar`}>{actionBar}</div>
          </div>
        }
        <el-table data={this.data} v-loading={this.loading} size={this.size}
                  stripe={this.stripe} border={this.border} show-header={this.showHeader}
                  highlight-current-row={this.highlightCurrentRow}
          {...{ props: this.$attrs, on: this.$listeners }}>
          {
            Object.entries(otherSlots).map(([key, val]) =>
              <template slot={key}>{val}</template>
            )
          }
          {
            this.columns.map(column => {
              const { formatter, renderBody, isShow } = column;
              if (isShow === false){
                return (
                  <span></span>
                );
              }
              const data = {
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
              return (
                  <el-table-column {...data}  ></el-table-column>
              );
            })
          }
        </el-table>
        {
          this.hasPagination &&
          <el-pagination class={`el-pagination--${this.paginationAlign}`}
            current-page={this.currentPage} page-size={this.pageSize} page-sizes={ this.pageSizes}
            total={this.total} on-current-change={this.handleCurrentChange} on-size-change={this.sizeChange}
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        }
      </div>
    );
  }
};
