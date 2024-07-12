
// Notice: React Select Component
// Switched to Headless UI's Listbox for performance. 
// Keeping this code here for one day in case we need to revert back.


// import { useTheme } from '@/hooks/context/useTheme';
// import Select, { StylesConfig } from 'react-select';

// interface IProps {
//     selectedOption: SelectedOption|null
//     setSelectedOption: React.Dispatch<React.SetStateAction<SelectedOption | null>>
//     options: SelectedOption[]
//     className?: string
// }
// type IsMulti = false;

// const ReactSelect = ({ selectedOption, setSelectedOption, options , className}: IProps) => {
//     const {isDark} = useTheme()
//     const styles = isDark ? darkStyles : lightStyles;
//     return (
//         <Select
//             defaultValue={selectedOption}
//             onChange={setSelectedOption}
//             options={options}
//             className={className}
//             styles={styles}
//         />
//     )
// }

// export default ReactSelect

// const darkStyles:StylesConfig<SelectedOption,IsMulti> = {
//     control: (provided) => ({
//         ...provided,
//         width: '100%',
//         borderRadius: '0.375rem',
//         border: 'none',
//         padding: '0.375rem',
//         color: '#D1D5DB',
//         backgroundColor: '#374151',
//         boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
//         '&:hover': {
//             borderColor: 'transparent',
//         },
//         '&:focus': {
//             ringWidth: '2px',
//             ringColor: '#818CF8',
//         },
//     }),
//     menu: (provided) => ({
//         ...provided,
//         backgroundColor: '#374151',
//     }),
//     option: (provided, state) => ({
//         ...provided,
//         backgroundColor: state.isSelected ? '#6366F1' : '#374151',
//         color: state.isSelected ? '#FFFFFF' : '#D1D5DB',
//         '&:hover': {
//             backgroundColor: '#4B5563',
//         },
//     }),
// };
  


// const lightStyles:StylesConfig<SelectedOption,IsMulti> = {
//     control: (provided) => ({
//         ...provided,
//         width: '100%',
//         borderRadius: '0.375rem',
//         border: 'none',
//         padding: '0.375rem',
//         color: '#1F2937',
//         backgroundColor: '#F3F4F6',
//         boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
//         '&:hover': {
//             borderColor: 'transparent',
//         },
//         '&:focus': {
//             ringWidth: '2px',
//             ringColor: '#6366F1',
//         },
//     }),
//     menu: (provided) => ({
//         ...provided,
//         backgroundColor: '#F3F4F6',
//     }),
//     option: (provided, state) => ({
//         ...provided,
//         backgroundColor: state.isSelected ? '#6366F1' : '#F3F4F6',
//         color: state.isSelected ? '#FFFFFF' : '#1F2937',
//         '&:hover': {
//             backgroundColor: '#E5E7EB',
//         },
//     }),
// };