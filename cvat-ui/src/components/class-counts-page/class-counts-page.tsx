// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Button from 'antd/lib/button';
import Empty from 'antd/lib/empty';
import Result from 'antd/lib/result';
import Spin from 'antd/lib/spin';

import GoBackButton from 'components/common/go-back-button';
import ClassCountsChart from './class-counts-chart';

interface ClassCount {
    label: string;
    count: number;
}

type LoadState =
    | { status: 'loading' }
    | { status: 'error'; message: string }
    | { status: 'ready'; counts: ClassCount[] };

export default function ClassCountsPage(): JSX.Element {
    const { tid } = useParams<{ tid: string }>();
    const [state, setState] = useState<LoadState>({ status: 'loading' });

    const load = useCallback(async () => {
        setState({ status: 'loading' });
        try {
            const response = await fetch(`/api/tasks/${tid}/class-counts`, { credentials: 'same-origin' });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const body = await response.json();
            setState({ status: 'ready', counts: body.counts });
        } catch (error: unknown) {
            setState({
                status: 'error',
                message: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }, [tid]);

    useEffect(() => {
        load();
    }, [load]);

    let content: JSX.Element;
    if (state.status === 'loading') {
        content = <Spin size='large' />;
    } else if (state.status === 'error') {
        content = (
            <Result
                status='error'
                title='Could not load class counts'
                subTitle={state.message}
                extra={<Button type='primary' onClick={load}>Retry</Button>}
            />
        );
    } else if (state.counts.length === 0) {
        content = <Empty description='No annotations in this task' />;
    } else {
        content = <ClassCountsChart counts={state.counts} />;
    }

    return (
        <div className='cvat-class-counts-page'>
            <GoBackButton />
            <h2>{`Annotations per class, task #${tid}`}</h2>
            {content}
        </div>
    );
}