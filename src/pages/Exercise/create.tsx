import React, { useState } from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Checkbox, Form, Input, InputNumber, Select, Upload } from "antd";
import { provider } from "../../App";
import { cleanUrl, getSignedUrl } from "../../utils/getUrl";
import {uploadToPresignedUrl} from "../../utils/upload.utils";

export const ExerciseCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const [feelingFile, setFeelingFile] = useState();
  const [journeyFile, setJourneyFile] = useState();
  const [loading, setLoading] = useState(false);

  const onFeelingChange = ({ file }: any) => {
    setFeelingFile(file);
  };

  const onJourneyChange = ({ file }: any) => {
    setJourneyFile(file);
  };

  const customUpload = async (url: string, file: File) => {
    try {
      return await uploadToPresignedUrl(url, file);
    } catch (error) {
      console.log(error);
      window.location.href = "/exercise";
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const feelingUrl = await customUpload(await getSignedUrl(), feelingFile!); // Call upload here
      const journeyUrl = await customUpload(await getSignedUrl(), journeyFile!); // Call upload here

      const payload = {
        ...values,
        feelingImage: cleanUrl(feelingUrl!.url!),
        journeyImage: cleanUrl(journeyUrl!.url!),
      };

      await provider.custom({
        url: `${process.env.REACT_APP_API_URL}/api/exercise`,
        method: "post",
        payload: payload,
      });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    // reset form fields and navigate to homepage
    formProps.form!.resetFields();
    window.location.href = "/exercise";
  };

  return (
    <Create saveButtonProps={saveButtonProps} isLoading={loading}>
      <Form {...formProps} layout="vertical" onFinish={handleSubmit}>
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
          <Select>
            <Select.Option value="gpt-3.5-turbo">GPT-3.5-Turbo</Select.Option>
            <Select.Option value="gpt-3.5-turbo-0301">
              GPT-3.5-Turbo-0301
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Temperature"
          name={["temperature"]}
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              max: 2,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Max Length"
          name={["maxLength"]}
          rules={[
            {
              required: true,
              type: "number",
              min: 1,
              max: 2048,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Top P"
          name={["topP"]}
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              max: 1,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Frequency Penalty"
          name={["frequencyPenalty"]}
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              max: 2,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Presence Penalty"
          name={["presencePenalty"]}
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              max: 2,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Feeling Image">
          <Upload.Dragger
            listType="picture-card"
            beforeUpload={() => false}
            onChange={onFeelingChange}
          >
            <p className="ant-upload-text">Drag & drop a file in this area</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item label="Journey Image">
          <Upload.Dragger
            onChange={onJourneyChange}
            listType="picture-card"
            beforeUpload={() => false}
          >
            <p className="ant-upload-text">Drag & drop a file in this area</p>
          </Upload.Dragger>
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
          <InputNumber />
        </Form.Item>
      </Form>
    </Create>
  );
};
