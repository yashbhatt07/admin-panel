import Select from 'react-select'

import { Controller } from 'react-hook-form'

function SelectItems({ control, options, name }) {
    return (
        <>
            <Controller name={name} control={control} render={({ field }) => <Select {...field} options={options} />} />
        </>
    )
}

export default SelectItems
