import React from "react";
import { TablePro } from "components/tablePro/TablePro";
import { usePromise } from "hooks/usePromise";
import { ProColumns, TableDropdown } from "@ant-design/pro-table";
import { Space, Tag } from "antd";
import { useHistory } from "react-router-dom";

const Index = () => {
  const { request } = usePromise(async () => {
    const res = await fetch("https://proapi.azurewebsites.net/github/issues");
    return res.json();
  });

  const router = useHistory()

  const columns: ProColumns[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "标题",
      dataIndex: "title",
      copyable: true,
      ellipsis: true,
      tip: "标题过长会自动收缩",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "此项为必填项",
          },
        ],
      },
      width: "30%",
    },
    {
      title: "状态",
      dataIndex: "state",
      filters: true,
      onFilter: true,
      valueType: "select",
      valueEnum: {
        all: { text: "全部", status: "Default" },
        open: {
          text: "未解决",
          status: "Error",
        },
        closed: {
          text: "已解决",
          status: "Success",
          disabled: true,
        },
        processing: {
          text: "解决中",
          status: "Processing",
        },
      },
    },
    {
      title: "标签",
      dataIndex: "labels",
      search: false,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          {record.labels.map(({ name, color }) => (
            <Tag color={color} key={name}>
              {name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "创建时间",
      key: "showTime",
      dataIndex: "created_at",
      valueType: "date",
      hideInSearch: true,
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      valueType: "dateRange",
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: "操作",
      valueType: "option",
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a onClick={()=>router.push('/list/detail')}>查看</a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action.reload()}
          menus={[
            { key: "copy", name: "复制" },
            { key: "delete", name: "删除" },
          ]}
        />,
      ],
    },
  ];
  return (
    <div>
      <TablePro columns={columns} request={request} />
    </div>
  );
};

export default Index;
