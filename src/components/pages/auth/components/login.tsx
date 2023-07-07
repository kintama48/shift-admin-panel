import React from "react";
import { Form, Input, Button } from "antd";
import {
  LoginPageProps,
  LoginFormTypes,
  useRouterContext,
  useLink,
  useRouterType,
  useLogin,
  useTranslate,
  useActiveAuthProvider,
} from "@refinedev/core";
import { LoginOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16 },
};

type LoginProps = LoginPageProps<
  React.HTMLAttributes<HTMLDivElement>,
  React.HTMLAttributes<HTMLDivElement>,
  React.FormHTMLAttributes<HTMLFormElement>
>;

export const LoginPage: React.FC<LoginProps> = ({
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title = undefined,
}) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const translate = useTranslate();

  const authProvider = useActiveAuthProvider();
  const { mutate: login } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const onFinish = (values: any) => {
    const { email, password } = values;
    login({ email, password });
  };

  const content = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        {...contentProps}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          borderRadius: "25px",
          padding: "50px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
          backgroundImage: "linear-gradient(135deg, black, lightgray 70%)",
          color: "transparent",
        }}
      >
        <img src={"/logo.png"} style={{ width: "30%", marginBottom: "8%" }} />
        <div>
          <Form {...formProps} {...layout} onFinish={onFinish}>
            <Form.Item
              label={translate("pages.login.fields.email", "Email")}
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
              wrapperCol={{offset: 0, span: 16}} labelCol={{span:5}}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={translate("pages.login.fields.password", "Password")}
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
              wrapperCol={{offset: 0, span: 14}} labelCol={{span:0, offset: 0}}
            >
              <Input.Password />
            </Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Form.Item>
                <Button
                  icon={<LoginOutlined />}
                  type="primary"
                  htmlType="submit"
                  style={{ width: "210px" }}
                >
                  {translate("pages.login.signin", "Sign in")}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );

  return (
    <div {...wrapperProps}>
      {renderContent ? renderContent(content, title) : content}
    </div>
  );
};
