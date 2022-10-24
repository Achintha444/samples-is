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

import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend, LineElement, LinearScale, PointElement,
    RadialLinearScale,
    Title,
    Tooltip
} from "chart.js";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import React from "react";
import "rsuite/dist/rsuite.min.css";
import config from "../config.json";
import "../styles/custom-theme.less";
import "../styles/globals.css";

function MyApp(prop) {

    const { Component, pageProps } = prop;

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        PointElement,
        LineElement,
        ArcElement,
        RadialLinearScale,
        Title,
        Tooltip,
        Legend
    );

    return (
        <SessionProvider session={ pageProps ? pageProps.session : null }>
            <Head>
                <title>{ config.CUSTOMIZATION.name }</title>
                <meta name="description" content={ config.CUSTOMIZATION.name } />
            </Head>

            <Component { ...pageProps } />
        </SessionProvider>
    );
}

export default MyApp;
