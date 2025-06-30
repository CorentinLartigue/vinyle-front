import React from 'react';

const RangeFilter = ({
                         minValue,
                         maxValue,
                         range,
                         step = 1,
                         onChangeRange,
                         unit = '',
                     }) => {

    const updateMin = (value) => {
        const val = Number(value);
        if (val <= range[1]) {
            onChangeRange([val, range[1]]);
        }
    };

    const updateMax = (value) => {
        const val = Number(value);
        if (val >= range[0]) {
            onChangeRange([range[0], val]);
        }
    };

    return (
        <section>
            <div className="mt-2 space-y-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Min : {range[0]} {unit}
                    </label>
                    <input
                        type="range"
                        min={minValue}
                        max={maxValue}
                        step={step}
                        value={range[0]}
                        onChange={(e) => updateMin(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Max : {range[1]} {unit}
                    </label>
                    <input
                        type="range"
                        min={minValue}
                        max={maxValue}
                        step={step}
                        value={range[1]}
                        onChange={(e) => updateMax(e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default RangeFilter;
