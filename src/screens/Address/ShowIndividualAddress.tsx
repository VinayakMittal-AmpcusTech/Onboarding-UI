import * as React from 'react';
import { TextField } from "../../common/TextField/TextField";
import Select from "react-select";
import { LocationName } from '../../constants/candidateclientconstants';
import { Button } from '../../common/Button/Button';
import { editClientData } from '../../actions/client';
import { useAppDispatch } from '../../hooks/app';

interface Props {
    open: any,
    setOpen: any,
    data: any,
    showTableCount: any,
    int: any,
    setShowModal: any,
}

const ShowIndividualAddress: React.FC<Props> = ({ open, setOpen,
    // data, 
    showTableCount, data, int, setShowModal }) => {
    console.log('data: ', data);
    const dispatch = useAppDispatch();
    const [line1, setLine1] = React.useState(data?.line1);
    const [line2, setLine2] = React.useState(data?.line2);
    const [city, setCity] = React.useState(data?.city);
    const [state, setState] = React.useState({
        label: data?.state,
        value: data?.state,
    });
    const [zipCode, setZipCode] = React.useState(data?.zipCode);
    const [country, setCountry] = React.useState(data?.country);
    const [email, setEmail] = React.useState(data?.contactDetailId.email);
    const [contactNumber, setContactNumber] = React.useState(data?.contactDetailId.contactNumber);

    const [count, setCount] = React.useState(0);
    const locationName = LocationName;

    React.useEffect(() => {
        setCount(1);
        setLine1(data?.line1);
        setLine2(data?.line2);
        setCity(data?.city);
        setState({
            label: data?.state,
            value: data?.state,
        });
        setZipCode(data?.zipCode);
        setCountry(data?.country);
        setEmail(data?.contactDetailId.email);
        setContactNumber(data?.contactDetailId.contactNumber);
    }, [data])

    const updateCandidateAddress = () => {
        dispatch(editClientData(
            data.personId,
            line1,
            line2,
            city,
            state?.value,
            zipCode,
            country
        ));
        setShowModal(false);
    }

    return (
        <>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>

                </thead>
                <tbody>
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-6 py-4'>
                            <span>Line 1</span>
                        </td>
                        <td className='px-6 py-0'>
                            <TextField
                                value={line1}
                                placeholder={""}
                                handleChange={(event) => {
                                    setLine1(event?.target?.value);
                                }}
                                className="" />
                        </td>
                    </tr><tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-6 py-4'>
                            <span>Line 2</span>
                        </td>
                        <td className='px-6 py-0'>
                            <TextField
                                value={line2}
                                placeholder={""}
                                handleChange={(event) => {
                                    setLine2(event?.target?.value);
                                }}
                                className="" />
                        </td>
                    </tr><tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-6 py-4'>
                            <span>City</span>
                        </td>
                        <td className='px-6 py-0'>
                            <TextField
                                value={city}
                                placeholder={""}
                                handleChange={(event) => {
                                    setCity(event?.target?.value);
                                }}
                                className="" />
                        </td>
                    </tr><tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-6 py-4'>
                            <span>State</span>
                        </td>
                        <td className='px-6 py-0'>
                            <Select
                                options={locationName}
                                value={state}
                                getOptionLabel={(option) => option.label}
                                getOptionValue={(option) => option.value}
                                onChange={(e: any) => {
                                    setState(e);
                                }}
                                isSearchable={true} />
                        </td>
                    </tr><tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-6 py-4'>
                            <span>Zip code</span>
                        </td>
                        <td className='px-6 py-0'>
                            <TextField
                                value={zipCode}
                                placeholder={""}
                                handleChange={(event) => {
                                    setZipCode(event?.target?.value);
                                }}
                                className="" />
                        </td>
                    </tr><tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-6 py-4'>
                            <span>Country</span>
                        </td>
                        <td className='px-6 py-0'>
                            <TextField
                                value={country}
                                placeholder={""}
                                handleChange={(event) => {
                                    setCountry(event?.target?.value);
                                }}
                                className="" />
                        </td>
                    </tr><tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-6 py-4'>
                            <span>Candidate email address</span>
                        </td>
                        <td className='px-6 py-0'>
                            <TextField
                                value={email}
                                placeholder={""}
                                handleChange={(event) => {
                                    setEmail(event?.target?.value);
                                }}
                                className="" />
                        </td>
                    </tr><tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <td className='px-6 py-4'>
                            <span>Candidate contact no.</span>
                        </td>
                        <td className='px-6 py-0'>
                            <TextField
                                value={contactNumber}
                                placeholder={""}
                                handleChange={(event) => {
                                    setContactNumber(event?.target?.value);
                                }}
                                className="" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='m-auto w-[50%]'>
                <Button
                    className='w-[50px] text-white'
                    value="update"
                    handleClick={() => {
                        updateCandidateAddress();
                    }}
                />
            </div>
        </>
    );
}

export default ShowIndividualAddress;