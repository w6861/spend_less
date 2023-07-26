import {Layout, Menu, message} from "antd";
import {HomeOutlined, LogoutOutlined} from "@ant-design/icons";
import Categories from "./views/Categories";
import Home from "./views/Home";
import React from "react";
import "antd/dist/antd.js";
import {Routes, Route, Link, useLocation, Router} from "react-router-dom";
import Expenses from "./views/Expenses";
import ReactDOM from 'react-dom/client';



const {Header, Content, Footer} = Layout;
const {fetch: originalFetch} = window;

const App = () => {
    window.fetch = async (...args) => {
        let [resource, config] = args;
        let response = await originalFetch(resource, config);
        return response;
    };

    const location = useLocation();
    try {
        return (
            <div className="App">
                <Layout style={{minHeight: "100vh"}}>
                    <Header style={{padding: 0}}>
                        <Menu theme="dark" mode="horizontal" selectedKeys={location.pathname}>
                            <Menu.Item key="/">
                                <Link to="/">
                                    <HomeOutlined/>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/expenses">
                                <Link to="/expenses">Expenses</Link>
                            </Menu.Item>
                            <Menu.Item key="/Categories">
                                <Link to="/Categories">Categories</Link>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{padding: "2rem"}}>

                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="expenses" element={<Expenses/>}/>
                                <Route path="Categories" element={<Categories/>}/>
                            </Routes>


                    </Content>
                    <Footer style={{textAlign: "center"}}>Projekt zespołowy ©2023</Footer>
                </Layout>
            </div>
        );
    } catch (error) {
        message.error(error);
    }
};

export default App;
