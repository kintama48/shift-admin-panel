import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, getValueFromEvent } from "@refinedev/antd";
import { Form, Input, Checkbox, Upload, DatePicker } from "antd";
import dayjs from "dayjs";

export const ExerciseEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const exerciseData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps} canDelete={true}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Id"
          name={["id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input readOnly disabled />
        </Form.Item>
        <Form.Item
          label="Name"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="System Message"
          name="systemMessage"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label="Is Premium"
          valuePropName="checked"
          name={["isPremium"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox>Is Premium</Checkbox>
        </Form.Item>
        <Form.Item
          label="Model"
          name={["model"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Temperature"
          name={["temperature"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Max Length"
          name={["maxLength"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Top P"
          name={["topP"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Frequency Penalty"
          name={["frequencyPenalty"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Presence Penalty"
          name={["presencePenalty"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Feeling Image">
          <Form.Item
            name="feelingImage"
            getValueProps={(value) => ({
              fileList: [{ url: value, name: value, uid: value }],
            })}
            getValueFromEvent={getValueFromEvent}
            noStyle
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload.Dragger listType="picture" beforeUpload={() => false}>
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item label="Journey Image">
          <Form.Item
            name="journeyImage"
            getValueProps={(value) => ({
              fileList: [{ url: value, name: value, uid: value }],
            })}
            getValueFromEvent={getValueFromEvent}
            noStyle
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload.Dragger listType="picture" beforeUpload={() => false}>
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Display Name"
          name={["displayName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Short Description"
          name={["shortDescription"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Long Description"
          name={["longDescription"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Display Order"
          name={["displayOrder"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Created At"
          name={["createdAt"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Updated At"
          name={["updatedAt"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
      </Form>
    </Edit>
  );
};
