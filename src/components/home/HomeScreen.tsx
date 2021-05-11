import { DropdownProps, Select, Statistic } from "semantic-ui-react";
import { weekOptions } from "../../helpers/weekOptions";
import { getSalesByMonthAndYear, startGetAllSales } from "../../actions/sales";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { yearOption } from "../../helpers/yearOptions";
import _ from "lodash";

export const HomeScreen = () => {
    const dispatch = useDispatch();
    const { totalGained, salesFiltered } = useSelector(
        (state: RootStateOrAny) => state.sal
    );
    const [monthActual, setMonthActual] = useState("");
    const yearCurrent = useRef("");

    useEffect(() => {
        dispatch(startGetAllSales());
    }, [dispatch]);
    const handleSelectWeekChange = (e: any, data: any) => {
        yearCurrent.current &&
            dispatch(getSalesByMonthAndYear(data.value, yearCurrent.current));
        setMonthActual(data.value);
    };
    const handleYearChange = (
        event: React.SyntheticEvent<HTMLElement, Event>,
        data: DropdownProps | any
    ) => {
        yearCurrent.current = data.value;
        monthActual &&
            dispatch(getSalesByMonthAndYear(monthActual, yearCurrent.current));
    };

    return (
        <div style={{ marginLeft: 20, marginTop: 30 }}>
            <Select
                onChange={handleYearChange}
                placeholder="Seleccione el año"
                options={yearOption}
                className="mr-3"
            />
            <Select
                onChange={handleSelectWeekChange}
                placeholder="Seleccione un mes"
                options={weekOptions}
            />
            <br />
            {monthActual && yearCurrent.current && (
                <>
                    <Statistic size="mini">
                        <Statistic.Label>
                            Importe {monthActual}/{yearCurrent.current}
                        </Statistic.Label>
                        <Statistic.Value>
                            S/{totalGained.toFixed(2)}
                        </Statistic.Value>
                    </Statistic>
                    <Statistic size="mini">
                        <Statistic.Label>
                            Ganancia {monthActual}/{yearCurrent.current}
                        </Statistic.Label>
                        <Statistic.Value>
                            S/
                            {_.sum(
                                _.map(salesFiltered, (p: any) => p.gained)
                            ).toFixed(2)}
                        </Statistic.Value>
                    </Statistic>
                </>
            )}
        </div>
    );
};
