import React, { Component } from 'react'
import "./index.less"
import { Input, Card, Modal, Icon, Table, message, Spin } from 'antd'
import { withRouter } from 'react-router-dom'
import { user } from '../../../redux/actions/index'
import { connect } from 'react-redux'

const Search = Input.Search
class useRole extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            visible: false,
            userData: [
            ],
            data: [],
            roleId: [],
            status: false,
            nameOfUser: '',
            noRepeat: false,
            repeatList: [],
            returnRole: [],
            roleListMsg: [],
            current: 1,
            layout: true,
            loading: false,
            tableLoading: false,
            deletaBox: false
        }
    }
    componentDidMount() {
    }
    getUserName(name) {
        console.log(name)
        if (!name.userName) return message.warning('用户名不能为空')
        this.setState({ loading: true })
        this.get('getUserName', name).then(res => {
            this.setState({ nameOfUser: name })
            console.log(res)
            this.setState({ userName: res.data.userInfo })
            this.setState({ userData: res.data.userRole })
            this.setState({ status: true })
            this.setState({ loading: false })
            if (res.code === 10003) {
                return message.warning('未找到该用户')
            }
        })
    }
    showModal() {
        console.log("999999", this.state.layout)
        if (this.state.layout) {
            this.setState({ layout: false })
            setTimeout(() => {
                this.setState({ layout: true })
            }, 2000)
            if (this.state.userData.length >= 5) {
                return message.warning('该用户已关联五个角色，请先删除角色再重新关联')
            }
            this.setState({
                visible: true
            });
        }
    }
    handleOk(e) {
        let value = {}
        value.userId = this.state.userName.id
        value.roleId = this.state.roleId
        console.log(this.state.userData, 888888888, value)
        let data = []
        let bool = false
        let newValue = this.state.roleId.slice()
        for (let key in this.state.userData) {
            console.log(this.state.userData[key].role.id)
            if (value.roleId.indexOf(this.state.userData[key].role.id) !== -1) {
                data.push(this.state.userData[key])
                bool = true
                newValue.splice(value.roleId.indexOf(this.state.userData[key].role.id), 1)
            }
        }
        console.log('((((((((((()))))))))))', newValue)
        if (newValue.length + this.state.userData.length > 5) {
            return message.warning('每个用户最多关联五个角色，请重新关联')
        }
        if (bool) {
            this.setState({ noRepeat: true })
            this.setState({
                visible: false
            });
            this.setState({ repeatList: data })
        } else {
            this.post('createUserRole', value).then(res => {
                this.getUserName(this.state.nameOfUser)
            })
            this.setState({
                visible: false
            });
        }

        this.setState({ returnRole: newValue })


    }
    handOk(e) {
        this.setState({
            noRepeat: false
        });
        let value = {}
        value.userId = this.state.userName.id
        value.roleId = this.state.returnRole
        this.setState({
            visible: false
        });
        if (!value.roleId) return
        this.post('createUserRole', value).then(res => {
            this.getUserName(this.state.nameOfUser)
        })
    }
    getRoleList(page, pageSize, roleName) {
        let value = {}
        //this.setState({ tableLoading: true })
        value.page = page
        value.size = pageSize
        value.roleName = ''
        if (roleName) {
            value.roleName = roleName
        }
        this.setState({ tableLoading: true })
        this.get('getRoleList', value).then(res => {
            //this.props.setUser(res.data.rows)
            console.log(res)
            this.setState({ data: res.data })
            this.setState({ tableLoading: false })
            //this.setState({ tableLoading: false })
        })
    }
    getMenuList(value){
        this.get('getMenuList').then(res=>{
            console.log(res)
        })
    }
    handleCancel(e) {
        console.log(e);
        this.setState({
            visible: false
        });
    }
    handCancel(e) {
        console.log(e);
        this.setState({
            noRepeat: false
        });
    }
    onDelete(data) {
        this.setState({deletaBox:true})
    }
    handleClickOk(data){
        this.setState({deletaBox:false})
        this.setState({ loading: true })
        this.get('deletUserRole', { id: data.id }).then(res => {
            console.log(res)
            this.getUserName(this.state.nameOfUser)
        })
    }
    handleClickCancel(){
        this.setState({deletaBox:false})
    }
    render() {
        let user = this.state.userData.map((data) => {
            return <Card title="角色信息"
                className='card'
                key={data.id}
                extra={<Icon type="delete" className='deleteRole'
                    onClick={this.onDelete.bind(this, data)} />}
            >
                <p>角色名：{data.role.roleName}</p>
                <p>角色详情：{data.role.remark}</p>
                <Modal
                    title="温馨提示"
                    visible={this.state.deletaBox}
                    onOk={this.handleClickOk.bind(this,data)}
                    onCancel={this.handleClickCancel.bind(this)}
                >
                    <p>
                        确认删除关联角色？
                    </p>
                </Modal>
            </Card>
        })
        const columns = [{
            title: '角色名称',
            dataIndex: 'roleName',
            width: 150,
            render: text => <a href="javascript:;">{text}</a>
        }, {
            title: '角色详情',
            width: 150,
            dataIndex: 'remark'
        }]
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows, record) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                let dataId = selectedRowKeys
                this.setState({ roleId: dataId })
                // console.log(this.state.data.rows,'MMMMMMMMM')
                // this.state.data.rows.map(item=>{
                //     console.log(item)
                //     item.name = 'Disabled User'
                // })
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name
            })
        }
        const repeatTip = this.state.repeatList.map(item => {
            return < li key={item.id}><span>{item.role.roleName}</span></li >
        })
        return (
            <div className='userRole' >
                <div className='userSearch'>
                    <Search
                        placeholder="请输入查询的用户名"
                        enterButton="查询"
                        onSearch={value => this.getUserName({ userName: value })}
                    ></Search>
                </div>
                <div className='userSearch'>
                    <Search
                        placeholder="请输入查询的用户名"
                        enterButton="查询"
                        onSearch={value => this.getMenuList({ userName: value })}
                    ></Search>
                </div>
                {
                    this.state.status ?
                        <Spin spinning={this.state.loading}>
                            <div className='userMsg'>
                                <ul className='ul'>
                                    <li className='roleText'>用户详细信息</li>
                                    <li className='userName'>用户名：{this.state.userName.name}</li>
                                </ul>
                            </div>
                            <div className='roleDetail'>
                                <p className='roleText'>角色权限</p>
                                {user}
                                <div className='addUser' onClick={this.showModal.bind(this)}>
                                    <div className='addRole'>
                                        <span>+</span>添加角色
                        </div>
                                </div>
                                <Modal
                                    title="用户角色配置"
                                    visible={this.state.visible}
                                    onOk={this.handleOk.bind(this)}
                                    onCancel={this.handleCancel.bind(this)}
                                >
                                    <Search
                                        placeholder="请输入查询的角色名"
                                        enterButton="查询"
                                        onSearch={value => this.getRoleList(1, 10, value)}
                                        className='roleSearch'
                                    ></Search>
                                    <Table
                                        bordered
                                        rowSelection={rowSelection}
                                        columns={columns}
                                        dataSource={this.state.data.rows}
                                        rowKey={record => record.id}
                                        scroll={{ y: 260 }}
                                        loading={this.state.tableLoading}
                                        pagination={{
                                            total: this.state.data.count,
                                            defaultPageSize: 10,
                                            defaultCurrent: 1,
                                            current: this.state.current,
                                            onChange: (page, pageSize) => {
                                                console.log('current page: ', page, pageSize)
                                                this.setState({
                                                    current: page,
                                                    pageSize: pageSize
                                                })
                                                this.getRoleList(page, pageSize)
                                            },
                                            onShowSizeChange: (page, pageSize) => {
                                                console.log('current page: ', page, pageSize)
                                                this.setState({
                                                    current: page,
                                                    pageSize: pageSize
                                                })
                                                this.getRoleList(page, pageSize)
                                            }
                                        }}
                                    />
                                </Modal>
                                <Modal
                                    title='温馨提示'
                                    visible={this.state.noRepeat}
                                    onOk={this.handOk.bind(this)}
                                    onCancel={this.handCancel.bind(this)}
                                >
                                    <ul>
                                        {repeatTip}
                                    </ul>
                                    <p>
                                        已经关联该用户，不能重复关联
                                        </p>
                                </Modal>
                            </div>
                        </Spin> : null
                }
            </div >
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {
    ...user
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(useRole))