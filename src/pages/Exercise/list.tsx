import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  MarkdownField,
  BooleanField,
  DateField,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const ExerciseList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column
          dataIndex="systemMessage"
          title="System Message"
          render={(value: any) => (
            <MarkdownField value={value.slice(0, 80) + "..."} />
          )}
        />
        <Table.Column
          dataIndex={["isPremium"]}
          title="Is Premium"
          render={(value: any) => <BooleanField value={value} />}
        />
        <Table.Column dataIndex="model" title="Model" />
        <Table.Column dataIndex="temperature" title="Temperature" />
        <Table.Column dataIndex="maxLength" title="Max Length" />
        <Table.Column dataIndex="topP" title="Top P" />
        <Table.Column dataIndex="frequencyPenalty" title="Frequency Penalty" />
        <Table.Column dataIndex="presencePenalty" title="Presence Penalty" />
        <Table.Column
          dataIndex={["createdAt"]}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["updatedAt"]}
          title="Updated At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
