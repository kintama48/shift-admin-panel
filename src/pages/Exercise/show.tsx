import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
  BooleanField,
  DateField,
  ImageField,
  MarkdownField,
  NumberField,
  Show,
  TextField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ExerciseShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} canDelete={true}>
      <Title level={5}>Id</Title>
      <TextField value={record?.id} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>System Message</Title>
      <MarkdownField value={record?.systemMessage} />
      <Title level={5}>Is Premium</Title>
      <BooleanField value={record?.isPremium} />
      <Title level={5}>Model</Title>
      <TextField value={record?.model} />
      <Title level={5}>Temperature</Title>
      <NumberField value={record?.temperature ?? ""} />
      <Title level={5}>Max Length</Title>
      <NumberField value={record?.maxLength ?? ""} />
      <Title level={5}>Top P</Title>
      <NumberField value={record?.topP ?? ""} />
      <Title level={5}>Frequency Penalty</Title>
      <NumberField value={record?.frequencyPenalty ?? ""} />
      <Title level={5}>Presence Penalty</Title>
      <NumberField value={record?.presencePenalty ?? ""} />
      <Title level={5}>Feeling Image</Title>
      <ImageField style={{ maxWidth: 200 }} value={record?.feelingImage} />
      <Title level={5}>Journey Image</Title>
      <ImageField style={{ maxWidth: 200 }} value={record?.journeyImage} />
      <Title level={5}>Display Name</Title>
      <TextField value={record?.displayName} />
      <Title level={5}>Short Description</Title>
      <TextField value={record?.shortDescription} />
      <Title level={5}>Long Description</Title>
      <TextField value={record?.longDescription} />
      <Title level={5}>Display Order</Title>
      <NumberField value={record?.displayOrder ?? ""} />
      <Title level={5}>Created At</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>Updated At</Title>
      <DateField value={record?.updatedAt} />
    </Show>
  );
};
