import React from 'react';
import { Table, Button } from 'antd';
import reqwest from 'reqwest';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '20%',
}, {
  title: 'Gender',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],
  width: '20%',
}, {
  title: 'Email',
  dataIndex: 'email',
}];

class App extends React.Component {
  state = {
    active: true,
    data: [],
    pagination: {},
    loading: false,
  }
  componentDidMount() {
    document.body.addEventListener('click', this.hideStage);
    this.fetch();
  }
  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideStage);
  }
  hideStage = () => {
    this.setState({
      active: false,
    });
  }
  showStage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      active: true,
    });
  }
  fetch = (params = {}) => {
    this.setState({ loading: true });
    reqwest({ 
      url: 'https://randomuser.me/api',
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then((data) => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination,
      });
    });
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  render() {
    return (
      <div 
        onClick={this.showStage}
      >
        <div onClick={this.showStage}> adswedw</div>
        <Button type="primary">showtable</Button>
        <Table
          style={{ display: this.state.active ? 'block' : 'none' }}
          columns={columns}
          rowKey={record => record.registered}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default App;