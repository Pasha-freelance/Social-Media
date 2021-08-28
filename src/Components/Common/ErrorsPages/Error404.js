import React from 'react';
import {Button, Layout, Result} from "antd";
import {withRouter} from "react-router-dom";

const Error404 = (props) => {
    const goBackHandler = () => props.history.goBack()
    const GoBackButton = () => <Button type={'primary'} onClick={goBackHandler}>Вернуться назад</Button>
    return (
        <Layout>
            <Result
                status="404"
                title="404"
                subTitle="Похоже такой страницы не существует :("
                extra={<GoBackButton/>}
            />
        </Layout>
    );
};
export default withRouter(Error404)
