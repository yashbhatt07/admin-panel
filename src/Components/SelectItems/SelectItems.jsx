import Select from 'react-select'

import { Controller } from 'react-hook-form'

function SelectItems({ control, options, name, style = {} }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            ...style,
                        }),
                    }}
                    {...field}
                    options={options}
                />
            )}
        />
    )
}

export default SelectItems
