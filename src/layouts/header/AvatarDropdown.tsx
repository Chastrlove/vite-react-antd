import { Avatar, Menu, message, Spin } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import React from "react";
import avatar from "resource/images/userAvatar.png";
import HeaderDropdown from "./HeaderDropdown";
import { useHistory } from "react-router-dom";
import { USERINFO } from "config/Keys";
import * as localforage from "localforage";
import { removeAuth } from "config/AuthOperation";
import { useModel } from "../../model/GlobalProvider";
import { InitStateModelKey } from "../../model/InitStateStore";

const AvatarDropdown = (props) => {
  const history = useHistory();
  const { initialState } = useModel(InitStateModelKey);
  const logout = () => {
    removeAuth();
    localforage.removeItem(USERINFO);
    message.success("退出成功");
    history.push("/login");
  };

  const menuHeaderDropdown = (
    <Menu>
      <Menu.Item key="logout" onClick={logout}>
        <LoginOutlined type="logout" />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span>
        <Avatar size="small" src={avatar} alt="avatar" />
        {initialState?.userName ? (
          <span>{initialState.userName}</span>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
