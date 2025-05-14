import type { FC } from 'react'

import clsx from 'clsx'

import type { GridChartColLabelsProps, GridChartProps, GridChartRowProps } from './GridChart.types'

import Conditional from '@/components/01-atoms/Conditional/Conditional'
import Container from '@/components/01-atoms/Container/Container'

import styles from './GridChart.module.css'
import { generateColKey, getColorArray } from './GridChart.utils'

const GridChartRow: FC<GridChartRowProps> = ({ dataRow, dataRowIdx, label, colorArr, showValues, showNullValues }) => {
    const dataRowFields = []

    if (label != null)
        dataRowFields.push(
            <td key={label} className={styles.RowLabel}>
                {label}
            </td>
        )

    dataRow.forEach((dataRowCol, colIdx) => {
        dataRowFields.push(
            <td
                key={generateColKey(dataRow, dataRowIdx, colIdx)}
                className={styles.DataField}
                style={{ backgroundColor: colorArr[dataRowCol] }}
            >
                {showValues === false || (showNullValues === false && dataRowCol === 0) ? <>&nbsp;</> : dataRowCol}
            </td>
        )
    })

    return <tr key={`dataRow-${dataRow.join('')}}`}>{dataRowFields}</tr>
}

const GridChartColLabels: FC<GridChartColLabelsProps> = ({ labels }) => {
    // const height = `${Math.max(...labels[0].map((l) => l.length)) * 0.7}rem`

    return (
        <tr className='h-fit-content'>
            {labels[1].length > 0 && <td className={styles.ThatAwkwardCornerTD}>&nbsp;</td>}
            {labels[0].map((label) => (
                <td key={label} className={clsx(styles.ColLabel)}>
                    <div>{label}</div>
                </td>
            ))}
        </tr>
    )
}

const GridChart: FC<GridChartProps> = ({ title, data, labels, showValues, showNullValues, ...props }) => {
    showValues = showValues ?? true
    showNullValues = showNullValues ?? false

    const maxValue = Math.max(...(data ?? []).map((dataRow) => Math.max(...dataRow)))

    const colorArr = getColorArray('#ffffff', '#1E90FF', maxValue)

    return (
        <Container className={styles.GridChart} data-testid='GridChart'>
            <table>
                <Conditional condition={title != null}>
                    <caption className={styles.Title}>{title}</caption>
                </Conditional>

                <tbody>
                    {(data ?? []).map((dataRow, dataRowIdx) => (
                        <GridChartRow
                            key={JSON.stringify(dataRow) + dataRowIdx}
                            dataRow={dataRow}
                            dataRowIdx={dataRowIdx}
                            label={labels[1][dataRowIdx] ?? undefined}
                            colorArr={colorArr}
                            showValues={showValues}
                            showNullValues={showNullValues}
                            {...props}
                        />
                    ))}
                    {labels[0].length > 0 && <GridChartColLabels labels={labels} />}
                </tbody>
            </table>
        </Container>
    )
}

export default GridChart
