import moment from "moment";
import { useEffect, useState } from "react";
import "moment/locale/es"
const daysDates = new Array(31).fill(0).map((_, index) => index + 1);
const monthsDates = moment.months().map((month) => month.charAt(0).toUpperCase() + month.slice(1));
const yearsDates = new Array(30).fill(0).map((_, index) => moment().year() - index);

export const Filters = ({ setValueSearchFilter, returnDay = true, returnMonth = true, returnYear = true }) => {

    const [maxDays, setMaxDays] = useState(daysDates);
    const [date, setDate] = useState({ day: '', month: '', year: '' });
    const { day, month, year } = date;
    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        setDate(prev => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        setValueSearchFilter(prev => ({ ...prev, dateSearch: { ...date, month: month ? monthsDates[month] : '' } }));
        if (month !== '') {
            const yearRequestMoment = `${year ? year : moment().year()}`;
            const monthRequestMoment = `${month.length == 1 ? `0${Number(month) + 1}` : Number(month) + 1}`;
            // console.log(`${yearRequestMoment}-${monthRequestMoment}`)
            // console.log(moment(`${yearRequestMoment}-${monthRequestMoment}`, "YYYY-MM").daysInMonth());
            setMaxDays(daysDates.slice(0, moment(`${yearRequestMoment}-${monthRequestMoment}`, "YYYY-MM").daysInMonth()));
        }
    }, [date])
    return (

        <div className="filters__container">

            <p> Filtrar por: </p>
            <div className="filters__container__dates">
                {returnDay && <div className="day">
                    <select value={day} onChange={handleInputChange} className="scroll" name="day">
                        <option hidden defaultValue>
                            Día
                        </option>
                        <option value="">-</option>
                        {maxDays.map((day) => (
                            <option value={day} key={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>}

                <div className="month">
                    <select value={month} onChange={handleInputChange} className="scroll" name="month" required>
                        <option className="select__default" hidden defaultValue>
                            Mes
                        </option>
                        <option value="">-</option>

                        {monthsDates.map((month, index) => (
                            <option value={index} key={month}>
                                {monthsDates[index]}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="year">
                    <select value={year} onChange={handleInputChange} className="scroll" name="year" required>
                        <option hidden defaultValue>
                            Año
                        </option>

                        <option value="">-</option>
                        {yearsDates.map((year) => (
                            <option value={year} key={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

