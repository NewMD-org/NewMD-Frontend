import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./index.css";


export function classesTable() {
    return (
        <div className="TablePage_container">
            <table className='TablePage_table'>
                <tbody>
                    <tr className="noselect">
                        <th className='TablePage_index'></th>
                        <th className="days TablePage_index">Day 1</th>
                        <th className="days TablePage_index">Day 2</th>
                        <th className="days TablePage_index">Day 3</th>
                        <th className="days TablePage_index">Day 4</th>
                        <th className="days TablePage_index">Day 5</th>
                        <th className="days TablePage_index">Day 6</th>
                    </tr>
                    <tr className="TablePage_classes">
                        <th className="noselect TablePage_index">1</th>
                        <td className='TablePage_data' id="d1n1">
                            {/* <div>{d1n1_C}</div> */}
                            <div>teacher</div>
                        </td>
                        <td className='TablePage_data'>test</td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                    </tr>
                    <tr className="TablePage_classes">
                        <th className="noselect TablePage_index">2</th>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                    </tr>
                    <tr className="TablePage_classes">
                        <th className="noselect TablePage_index">3</th>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                    </tr>
                    <tr className="TablePage_classes">
                        <th className="noselect TablePage_index">4</th>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                    </tr>
                    <tr className="TablePage_classes">
                        <th className="noselect TablePage_index">5</th>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                    </tr>
                    <tr className="TablePage_classes">
                        <th className="noselect TablePage_index">6</th>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                    </tr>
                    <tr className="TablePage_classes">
                        <th className="noselect TablePage_index">7</th>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                    </tr>
                    <tr className="TablePage_classes">
                        <th className="noselect TablePage_index">8</th>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                        <td className='TablePage_data'></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}