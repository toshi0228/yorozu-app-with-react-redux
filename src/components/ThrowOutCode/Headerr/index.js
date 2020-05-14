import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import styles from './index.module.scss';
// const { Header } = Layout;

const GuestHeader = () => {
  return (
    <>
      <header>
        <Row
          className={styles.headerContainer}
          type="flex"
          justify="center"
          align="middle"
        >
          <Col span={3} className={styles.left}>
            <Link to="/">変更ーヘッダー</Link>
          </Col>

          <Col span={10} className={styles.center}>
            <Row
              type="flex"
              // justify="start"
              gutter={48}
              className={styles.box1}
            >
              <Col>
                <Row type="flex" className="menu" gutter={24}>
                  <Col>
                    <Link to="/plan">Home</Link>
                  </Col>
                  <Col>
                    <Link to="/project">ダッシュボード</Link>
                  </Col>
                  <Col>
                    <Link to="/time_line">Topic</Link>
                  </Col>
                  <Col>
                    <Link to="/create_plan">Create</Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col span={5} className={styles.right}>
            <Row type="flex" justify="end" gutter={48} span={8}>
              <Col>
                <Link to="/">
                  <div className={styles.btn}>ログイン</div>
                </Link>
              </Col>
              <Col>
                <Link to="/">
                  <div className={styles.btn}>新規登録</div>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </header>
    </>
  );
};

export default GuestHeader;

{
  /* <Row
type="flex"
// justify="start"
gutter={48}
className={styles.box1}
>
<Col>
  <Link to="/">変更ーヘッダー</Link>
</Col>

<Col>
  <Row type="flex" className="menu" gutter={24}>
    <Col>
      <Link to="/plan">Home</Link>
    </Col>
    <Col>
      <Link to="/project">About</Link>
    </Col>
    <Col>
      <Link to="/time_line">Topic</Link>
    </Col>
    <Col>
      <Link to="/create_plan">Create</Link>
    </Col>
  </Row>
</Col>

</Row>

<Row type="flex" justify="end" gutter={24} span={8}>
<Col>
  <Link to="/">ログイン</Link>
</Col>
<Col>
  <Link to="/">新規登録</Link>
</Col>
</Row> */
}