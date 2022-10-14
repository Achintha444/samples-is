/*
 * Copyright (c) 2022 WSO2 LLC. (http://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *http://www.apache.org/licenses/LICENSE-2.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import Image from 'next/image';
import React from 'react';
import { Button, Col, Divider, FlexboxGrid, Grid, Panel, Row, Stack } from 'rsuite';
import image1 from '../../../../public/internal/news1.jpeg';
import image2 from '../../../../public/internal/news2.jpeg';
import image3 from '../../../../public/internal/news3.jpeg';
import image4 from '../../../../public/internal/news4.jpeg';
import { getCurrentDate } from '../../../../util/util/common/common';

export default function SingleBlog(props) {

    return (
        <div style={{marginTop: '1rem', marginLeft: '-20px'}}>
            <Panel>
                <h4>{props.header}</h4>
                <p>{getCurrentDate()}</p>
                <br />
                <FlexboxGrid justify='space-between'>
                    <FlexboxGrid.Item colspan={5}>
                        <div style={{ height: '100px', width: '100%', textAlign: 'center' }}>
                            <Image src={selectImage()} alt='news image' layout='responsive'/>
                        </div>

                    </FlexboxGrid.Item>

                    <FlexboxGrid.Item colspan={18}>

                        <Stack spacing={30} direction='column' alignItems='flex-end'>
                            <p>{props.body}</p>

                            <FlexboxGrid justify="start" >
                                <FlexboxGrid.Item colspan={22} >
                                    <Button appearance="link" >
                                        Read More
                                    </Button>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>

                        </Stack>

                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <Divider />
            </Panel>
        </div>
    )
}

function selectImage() {
    var imageList = [image1, image2, image3, image4];

    return imageList[imageList.length * Math.random() | 0];
}
