import { Box, Button, Collapse, List, ListItemButton, ListItemText, Checkbox } from "@mui/material";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material"
// import ArgonBox from "components/ArgonBox";
import PropTypes from "prop-types";
import MDInput from "components/MDInput";
import { useMaterialUIController } from "context";

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

const ApnaSelect2 = ({ data, value, name, onChange, origin, valueKey, nameKey, isSimpleArray, ...rest }) => {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [openDropDown, setOpenDropDown] = useState(false)
  const [valueName, setValueName] = useState("")
  const [search, setSearch] = useState('')
  const outSideClose = useRef(null)
  useOutsideClosing(outSideClose, setOpenDropDown);

  const filterData = useMemo(() => {
    if (search && data && data?.length) {
      if (!isSimpleArray) return data?.filter(e => e[nameKey].toLowerCase()?.includes(search?.toLowerCase()))
      else if (isSimpleArray) return data?.filter(e => e.toLowerCase()?.includes(search?.toLowerCase()))
      else return []
    }
  }, [search])

  useEffect(() => {
    if (!isSimpleArray && data && data?.length) {
      const item = data?.find(e => e[valueKey] === value)
      if (item) setValueName(item[nameKey])
      else setValueName("")
    }
  }, [value, data])

  const handleClick = () => {
    setOpenDropDown(!openDropDown);
    setSearch('')
  };

  return (
    <>
      <div style={{ marginBottom: "10px", width: '100%' }} ref={outSideClose}>
        <List>
          <ListItemButton
            {...rest}
            sx={{
              borderRadius: '10px',
              border: '1px solid gainsboro',
              padding: '.575rem 1.125rem',
              position: 'relative',
              zIndex: '100'
            }} onClick={handleClick}>
            <ListItemText sx={({ palette: { dark, error, info, white } }) => ({
              '& .MuiTypography-root': {
                fontWeight: '500',
                fontSize: "14px",
                color: !darkMode ? dark.main : white.main,
              }
            })}
              primary={isSimpleArray ? name : valueName ? valueName : `Choose ${origin}`} />
            {openDropDown ? <ExpandLess color={!darkMode ? 'primary' : 'white'} /> : <ExpandMore color={!darkMode ? 'primary' : 'white'} />}
          </ListItemButton>
          <Checkbox {...rest} sx={{ position: 'absolute', top: '0', left: '-100%', }} checked={valueName ? true : false} />
          <Collapse
            sx={({ palette: { dark, error, info, white } }) => ({
              '& .MuiCollapse-wrapper': {
                height: '40%',
                overflowY: 'scroll'
              },
              backgroundColor: darkMode ? dark.main : white.main, // Customize the text color
            })}
            style={{
              position: 'absolute', width: '100%', border: '1px solid Silver', margin: '0.5rem 0', zIndex: '1000', borderRadius: "12px",
              padding: "2% "
            }} in={data && data.length && openDropDown} timeout="auto">
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
                    value={search}
                  />
                </ListItemButton>
              </Box>
              <hr />
              {!search ? data && data.length > 0 ? data?.map((elm, i) => {
                return (
                  <ListItemButton onClick={() => {
                    onChange(isSimpleArray ? name : {
                      target: {
                        name,
                        value: elm[valueKey],
                        fullObject: elm
                      }
                    })
                    handleClick()
                  }} key={i} sx={{ pl: 1, fontSize: "1rem" }}>
                    <ListItemText sx={({ palette: { dark, error, info, white } }) => ({
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
                  handleClick()
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
                      onChange(isSimpleArray ? name : {
                        target: {
                          name,
                          value: elm[valueKey],
                          fullObject: elm
                        }
                      })
                      handleClick()
                    }} key={i} sx={{ pl: 1 }}>
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
                    handleClick()
                  }} sx={{ pl: 1 }}>
                    <ListItemText sx={({ palette: { dark, error, info, white } }) => ({
                      '& .MuiTypography-root': {
                        color: !darkMode ? dark.main : white.main,
                      }
                    })} primary={'Sorry No Data To Show'} />
                  </ListItemButton>}

            </List>
          </Collapse>
        </List>
      </div >
    </>
  );
};

export default ApnaSelect2;

ApnaSelect2.propTypes = {
  data: PropTypes.any,
  value: PropTypes.any,
  name: PropTypes.any,
  onChange: PropTypes.any,
  origin: PropTypes.any,
  valueKey: PropTypes.any,
  nameKey: PropTypes.any,
  isSimpleArray: PropTypes.any,
};