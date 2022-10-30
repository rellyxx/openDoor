import { Col, Row } from 'antd';
import React from 'react';
import styles from './index.less'
import strongbox from './../../../public/icons/strongbox.svg'
import glp from './../../../public/icons/glp.svg'


const Products: React.FC = () => {
  return (
    <div className={styles.products}>
      <h1>Produts Overview</h1>
      <Row justify='space-between'>
          <Col className={styles.col} >
                <div>
                  <img src={strongbox} alt="" />
                  <span>Total Collateral</span>
                  <div className={styles.num}>
                    $25,315,96.66
                  </div>
                </div>
          </Col>
          <Col className={styles.col} >
                <div>
                  <img src={strongbox} alt="" />
                  <span>Total Collateral</span>
                  <div className={styles.num}>
                    $25,315,96.66
                  </div>
                </div>
          </Col>
          <Col className={styles.col} >
                <div>
                  <img src={strongbox} alt="" />
                  <span>Total Collateral</span>
                  <div className={styles.num}>
                    $25,315,96.66
                  </div>
                </div>
          </Col>
      </Row>

      <Row className={styles.glp}>
        <Col span={8}>
          <h1>Produts</h1>
          <Col>
                  <div className={styles.card}>
                      <div className={styles.title}> 
                        <div className={styles.strongbox}>
                          <img src={glp} alt="GLP" />
                        </div> 
                        <span>GLP</span>
                      </div>
                      <div style={{border:0}} className={styles.content}>
                        <div className={styles.row} style={{background:'transparent',border:'0px'}}>
                          <div className={styles.descNumber}>
                              <p className={styles.desc}>Min Collateral Ratio</p>
                              <div className={styles.number}>150%</div>
                          </div>

                          <div style={{textAlign:'right'}} className={styles.descNumber}>
                              <p className={styles.desc}>APR</p>
                              <div className={styles.number}>150%</div>
                          </div>
                        </div>

                        <div className={styles.row}>
                          <div className={styles.descNumber}>
                              <p className={styles.desc}>Your Deposit</p>
                              <div className={styles.number}>$10,360</div>
                          </div>

                          <div style={{textAlign:'right'}} className={styles.descNumber}>
                              <p className={styles.desc}>Rewards</p>
                              <div className={styles.number}>$1452.52</div>
                          </div>
                        </div>

                        <div className={styles.row}>
                          <div className={styles.descNumber}>
                              <p className={styles.desc}>Current TotalDeposits</p>
                              <div className={styles.number}>$4500360</div>
                          </div>

                          <div style={{textAlign:'right'}} className={styles.descNumber}>
                              <p className={styles.desc}>Max Capacity</p>
                              <div className={styles.number}>$24500360</div>
                          </div>
                        </div>
                        
                      </div>
                  </div>
                </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Products;
