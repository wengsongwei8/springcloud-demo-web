组件使用示例：
一、直接使用标签，控制内容或标签是否可见
<el-button @click="handleSearch" v-permission="'priCode'" >搜索</el-button>
<span v-permission="'priCode'" >test permission</span>
提示：priCode为对应的权限标签
注意：'priCode' 中的两个''不能去掉，因为如果不加''  v-permission会认为priCode是变量，会在data{}中查找
      ，如果找不到，还会报错
