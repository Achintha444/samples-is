/*
 * Copyright (c) 2022 WSO2 LLC. (https://www.wso2.com).
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

import cover2 from '../../../../public/internal/cover2.jpeg';
import cover3 from '../../../../public/internal/cover3.jpeg';
import cover4 from '../../../../public/internal/cover4.jpeg';
import cover5 from '../../../../public/internal/cover5.jpeg';
import { randomizeImages } from '../../../../util/util/common/common';

export default function CoverImage() {

    const imageList = [cover2, cover3, cover4, cover5];

    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            <Image src={randomizeImages(imageList)} height='400' alt='news image' layout='responsive'
                objectFit='cover' />
        </div>

    )
}
