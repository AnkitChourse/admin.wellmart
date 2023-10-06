import { Box, Button, Checkbox, CircularProgress, Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material"
// import ArgonBox from "components/ArgonBox";
import PropTypes from "prop-types";
import MDInput from "components/MDInput";
import { useMaterialUIController } from "context";
import http from "Utils/api2";
import InfiniteScroll from "react-infinite-scroll-component";
import SkLoading from "components/SkLoading";
import { useDispatch } from "react-redux";
import { handleAlert } from "redux/festures/alertSlice";

function useOutsideClosing(ref, setLocationSearchSwitch) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setLocationSearchSwitch(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [ref]);
}

const InfiniteApnaSelect = ({ fetchApi, value, name, onChange, origin, valueKey, nameKey, isSimpleArray, collpaseHeight, multi, fetchApiParams, ...rest }) => {
    const dispatch = useDispatch()
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [openDropDown, setOpenDropDown] = useState(false)
    const [valueName, setValueName] = useState([])
    const [search, setSearch] = useState('')
    const [data, setData] = useState(null)
    const [loader, setLoader] = useState(false)
    const [filterData, setFilterData] = useState(null)
    const [hasMore, setHasMore] = useState(false)
    const [page, setPage] = useState(1)
    const outSideClose = useRef(null)
    useOutsideClosing(outSideClose, setOpenDropDown);


    // const filterData = useMemo(() => {
    //     if (search && data && data?.length) {
    //         if (!isSimpleArray) return data?.filter(e => e[nameKey].toLowerCase()?.includes(search?.toLowerCase()))
    //         else if (isSimpleArray) return data?.filter(e => e.toLowerCase()?.includes(search?.toLowerCase()))
    //         else return []
    //     }
    // }, [search])

    useEffect(() => {
        setLoader(true)
        if (search.length) {
            http(`${process.env.REACT_APP_APII}${fetchApi}?page=${page}&search=${search}${fetchApiParams ? fetchApiParams : ''}`)
                .then(result => {
                    setFilterData(result?.data?.data)
                    if (page > 1) setPage(1)
                    setLoader(false)
                })
                .catch(err => {
                    dispatch(
                        handleAlert({
                            isOpen: true,
                            type: `error`,
                            msg: `${err.response?.data?.message}`,
                        })
                    );
                    setHasMore(false)
                    setLoader(false)
                })
        } else {
            setFilterData(null)
            http(`${process.env.REACT_APP_APII}${fetchApi}?page=${page}&search=${search}${fetchApiParams ? fetchApiParams : ''}`)
                .then(result => {
                    setData(result?.data?.data)
                    if (page > 1) setPage(1)
                    setLoader(false)
                })
                .catch(err => {
                    dispatch(
                        handleAlert({
                            isOpen: true,
                            type: `error`,
                            msg: `${err.response?.data?.message}`,
                        })
                    );
                    setHasMore(false)
                    setLoader(false)
                })
        }
    }, [search, openDropDown])


    const fetchMore = () => {
        http(`${process.env.REACT_APP_APII}${fetchApi}?page=${page}&search=${search}`)
            .then(result => {
                if (result?.data?.data?.length) {
                    if (search?.length) {
                        setFilterData([...filterData, ...result?.data?.data])
                        setPage(page + 1)
                    } else {
                        setData([...data, ...result?.data?.data])
                        setPage(page + 1)
                    }
                } else setHasMore(false)
            })
            .catch(err => {
                toast.error(`An error occured - ${err.error || err.message || err}`, 2000)
                setHasMore(false)
            })
    }

    useEffect(() => {
        if (!isSimpleArray && data && data?.length) {
            if (multi) {
                const temp = []
                data?.map(e => value.includes(e[valueKey]) ? temp.push(e[nameKey]) : null)
                if (temp?.length) setValueName(temp)
                else setValueName("")
            } else {
                const item = data?.find(e => e[valueKey] === value)
                if (item) setValueName(item[nameKey])
                else setValueName("")
            }
        }
    }, [value, data])


    const handleClick = () => {
        setSearch('')
        setHasMore(true)
        setPage(1)
        setOpenDropDown(!openDropDown);
    };
    // console.log(value)
    return (
        <>
            <div style={{ marginBottom: "10px", width: '100%', position: 'realtive' }} ref={outSideClose}>
                <List>
                    <ListItemButton
                        {...rest}
                        sx={{
                            borderRadius: '10px',
                            border: '1px solid gainsboro',
                            padding: '.575rem 1.125rem'
                        }} onClick={handleClick}>
                        <ListItemText sx={({ palette: { dark, error, info, white } }) => ({
                            '& .MuiTypography-root': {
                                fontWeight: '500',
                                fontSize: "14px",
                                color: !darkMode ? dark.main : white.main,
                            }
                        })}
                            primary={isSimpleArray ? name : valueName && valueName?.length ? Array.isArray(valueName) ? valueName?.join(', ') : valueName : `Choose ${origin}`} />
                        {openDropDown ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                        id="collapseDiv"
                        sx={({ palette: { dark, error, info, white } }) => ({
                            '& .MuiCollapse-wrapper': {
                                height: '40%',
                                overflowY: 'auto',
                            },
                            backgroundColor: darkMode ? dark.main : white.main, // Customize the text color
                        })}
                        style={{
                            width: '100%', border: '1px solid Silver', margin: '0.5rem 0', zIndex: '1000000', borderRadius: "12px",
                            padding: "2% "
                        }} in={openDropDown} timeout="auto">
                        <List sx={{ position: 'relative' }} component="div" disablePadding>
                            <Box sx={({ palette: { dark, error, info, white } }) => ({
                                position: 'sticky', top: '0', backgroundColor: darkMode ? dark.main : white.main, zIndex: '1000', "& .MuiListItemText-root": {
                                    color: !darkMode ? dark.main : white.main,
                                }
                            })}>
                                <ListItemText sx={({ palette: { dark, error, info, white } }) => ({
                                    display: 'block', '& .MuiTypography-root': {
                                        fontWeight: '500',
                                        fontSize: "14px",
                                        color: !darkMode ? dark.main : white.main,
                                    }
                                })} primary={'Search'} />
                                <ListItemButton onClick={() => {
                                }} sx={{ pl: 1 }}>
                                    <MDInput
                                        className="form-control"
                                        type="text"
                                        data-bs-binded-element="#phone-value"
                                        data-bs-unset-value="Not specified"
                                        onChange={(e) => setSearch(e.target.value)}
                                        disabled={loader}
                                        value={search}
                                    />
                                </ListItemButton>
                            </Box>
                            <hr />
                            {loader ? <SkLoading /> : <InfiniteScroll
                                scrollableTarget="collapseDiv"
                                dataLength={search?.length ? filterData?.length || 0 : data?.length || 0}
                                // className={style.infiniteScroll}
                                next={fetchMore}
                                hasMore={hasMore}
                                loader={<CircularProgress color="primary" size={20} />}
                                endMessage={
                                    <>
                                        <div style={{ textAlign: 'center', width: '100%', margin: '2rem 0' }}>
                                            <b>...No More Data To Load...</b>
                                        </div>
                                    </>
                                }
                            >
                                {!search ? data && data.length > 0 ? data?.map((elm, i) => {
                                    return (
                                        <ListItemButton onClick={() => {
                                            if (multi) {
                                                if (value?.includes(elm[valueKey])) {
                                                    const temp = [...value]
                                                    temp.splice(value?.indexOf(elm[valueKey]), 1)
                                                    onChange(isSimpleArray ? name : {
                                                        target: {
                                                            name,
                                                            value: temp,
                                                            fullObject: elm
                                                        }
                                                    })
                                                } else {
                                                    onChange(isSimpleArray ? name : {
                                                        target: {
                                                            name,
                                                            value: [...value, elm[valueKey]],
                                                            fullObject: elm
                                                        }
                                                    })
                                                }
                                            } else {
                                                onChange(isSimpleArray ? name : {
                                                    target: {
                                                        name,
                                                        value: elm[valueKey],
                                                        fullObject: elm
                                                    }
                                                })
                                            }
                                            if (!multi) handleClick()
                                        }} key={i} sx={{ pl: 1, fontSize: "1rem" }}>
                                            {multi ? <Checkbox checked={value?.includes(elm[valueKey])} /> : null}
                                            < ListItemText sx={({ palette: { dark, error, info, white } }) => ({
                                                '& .MuiTypography-root': {
                                                    fontWeight: '400',
                                                    fontSize: "14px",
                                                    color: !darkMode ? dark.main : white.main,
                                                }
                                            })} primary={elm[nameKey]}
                                            />
                                        </ListItemButton>
                                    );
                                })
                                    : <ListItemButton onClick={() => {
                                        if (!multi) handleClick()
                                    }} sx={{ pl: 1 }}>
                                        <ListItemText sx={({ palette: { dark, error, info, white } }) => ({
                                            '& .MuiTypography-root': {
                                                color: !darkMode ? dark.main : white.main,
                                            }
                                        })} primary={'Sorry No Data To Show'} />
                                    </ListItemButton>
                                    : filterData && filterData?.length ? filterData?.map((elm, i) => {
                                        return (
                                            <ListItemButton onClick={() => {
                                                if (multi) {
                                                    if (value?.includes(elm[valueKey])) {
                                                        const temp = [...value]
                                                        temp.splice(value?.indexOf(elm[valueKey]), 1)
                                                        onChange(isSimpleArray ? name : {
                                                            target: {
                                                                name,
                                                                value: temp,
                                                                fullObject: elm
                                                            }
                                                        })
                                                    } else {
                                                        onChange(isSimpleArray ? name : {
                                                            target: {
                                                                name,
                                                                value: [...value, elm[valueKey]],
                                                                fullObject: elm
                                                            }
                                                        })
                                                    }
                                                } else {
                                                    onChange(isSimpleArray ? name : {
                                                        target: {
                                                            name,
                                                            value: elm[valueKey],
                                                            fullObject: elm
                                                        }
                                                    })
                                                }

                                                if (!multi) handleClick()
                                            }} key={i} sx={{ pl: 1 }}>
                                                {multi ? <Checkbox checked={value?.includes(elm[valueKey])} /> : null}
                                                <ListItemText sx={({ palette: { dark, error, info, white } }) => ({
                                                    '& .MuiTypography-root': {
                                                        fontWeight: '400',
                                                        fontSize: "14px",
                                                        color: !darkMode ? dark.main : white.main,
                                                    }
                                                })} primary={elm[nameKey]} />
                                            </ListItemButton>
                                        );
                                    })
                                        : <ListItemButton onClick={() => {
                                            if (!multi) handleClick()
                                        }} sx={{ pl: 1 }}>
                                            <ListItemText sx={({ palette: { dark, error, info, white } }) => ({
                                                '& .MuiTypography-root': {
                                                    color: !darkMode ? dark.main : white.main,
                                                }
                                            })} primary={'Sorry No Data To Show'} />
                                        </ListItemButton>}
                            </InfiniteScroll>}
                        </List>
                    </Collapse>
                </List >
            </div >
        </>
    );
};

export default InfiniteApnaSelect;

InfiniteApnaSelect.propTypes = {
    value: PropTypes.any,
    name: PropTypes.any,
    onChange: PropTypes.any,
    origin: PropTypes.any,
    valueKey: PropTypes.any,
    nameKey: PropTypes.any,
    isSimpleArray: PropTypes.any,
    fetchApi: PropTypes.any,
    collpaseHeight: PropTypes.any,
    multi: PropTypes.any,
    fetchApiParams: PropTypes.any
};