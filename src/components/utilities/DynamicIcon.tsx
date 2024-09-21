import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";
import GridViewIcon from '@mui/icons-material/GridView';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import DomainOutlinedIcon from '@mui/icons-material/DomainOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface DynamicIconProps extends SvgIconProps {
  iconName: string;
}

const iconMapping: { [key: string]: React.ElementType } = {
  GridViewIcon: GridViewIcon,
  PeopleAltOutlinedIcon: PeopleAltOutlinedIcon,
  ClassOutlinedIcon:ClassOutlinedIcon,
  DomainOutlinedIcon:DomainOutlinedIcon,
  DescriptionOutlinedIcon:DescriptionOutlinedIcon,
  Inventory2OutlinedIcon:Inventory2OutlinedIcon,
  CleanHandsIcon:CleanHandsIcon,
  EngineeringIcon: EngineeringIcon,
  AdminPanelSettingsIcon: AdminPanelSettingsIcon,
  MoreHorizIcon: MoreHorizIcon

};

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName, ...props }) => {
  const IconComponent = iconMapping[iconName] || iconMapping["HelpOutline"]; 
  return <SvgIcon component={IconComponent} {...props} />;
};

export default DynamicIcon;
