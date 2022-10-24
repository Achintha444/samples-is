/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from "react";
import { FlexboxGrid, Panel } from "rsuite";
import SingleBlog from "./otherComponents/singleBlog";
import newsList from "../../../../util/news/news.json";
import SettingsTitle from "../../../common/settingsTitle";

export default function BlogsComponent() {

    return (
        <div style={ { margin: "2rem" } }>
            <br />
            <FlexboxGrid justify="start">
                <FlexboxGrid.Item key={ 0 } colspan={ 24 }>
                    <SettingsTitle title="Recent Blogs" subtitle="View recent blogs by our uers" />
                </FlexboxGrid.Item>

                {
                    newsList.news.map(news => {

                        return (
                            <FlexboxGrid.Item key={ news.id * -1 } colspan={ 24 }>

                                <SingleBlog imgSrc={ news.image } header={ news.header } body={ news.body } />

                            </FlexboxGrid.Item>
                        );
                    })
                }
                {
                    newsList.news.map(news => {

                        return (
                            <FlexboxGrid.Item key={ news.id * -1 } colspan={ 24 }>
                                <Panel>
                                    <SingleBlog imgSrc={ news.image } header={ news.header } body={ news.body } />
                                </Panel>

                            </FlexboxGrid.Item>
                        );
                    })
                }

            </FlexboxGrid>
        </div>
    );
}
