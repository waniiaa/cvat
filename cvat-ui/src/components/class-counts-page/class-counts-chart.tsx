// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface Props {
    counts: { label: string; count: number }[];
}

export default function ClassCountsChart({ counts }: Props): JSX.Element {
    const data = {
        labels: counts.map((item) => item.label),
        datasets: [{
            label: 'Shapes',
            data: counts.map((item) => item.count),
            backgroundColor: '#1890ff',
        }],
    };

    return <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />;
}