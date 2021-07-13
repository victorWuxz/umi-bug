/* eslint-disable react/jsx-no-bind */
/* eslint-disable arrow-body-style */

import React from 'react';
import {PageContainer, PageContainerProps} from '@ant-design/pro-layout';
import {Link} from 'umi';
import uniqBy from 'lodash/uniqBy';
import styles from './index.less';

const PageHeader: React.FC<PageContainerProps> = props => {

    return (
        <PageContainer
            {...props}
            breadcrumbRender={(props, _) => {
                // @ts-ignore
                const matchMenus = props.matchMenus as Array<{name: string; path: string}>;
                const breadcrumbs = uniqBy(matchMenus, 'path');
                return breadcrumbs?.length > 1
                    ? breadcrumbs.map((item, index) => {
                        if (index === 0) {
                            return (
                                <Link
                                    className={styles.breadcrumbLink}
                                    key={item.path}
                                    to={item.path}
                                >
                                    {item.name}
                                </Link>
                            );
                        }
                        if (index === breadcrumbs.length - 1) {
                            return (
                                <span key={item.path} className={styles.breadcrumbLast}>
                                    <span className={styles.breadcrumbSeparator}>/</span>
                                    {item.name}
                                </span>
                            );
                        }
                        return (
                            <span key={item.path} className={styles.breadcrumb}>
                                <span className={styles.breadcrumbSeparator}>/</span>
                                <Link className={styles.breadcrumbLink} to={item.path}>{item.name}</Link>
                            </span>
                        );
                    })
                    : null;
            }}
        >
            {props.children}
        </PageContainer>
    );
};

export default PageHeader;
