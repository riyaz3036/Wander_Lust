import ColorConstants from "../../../constants/ColorConstants";
import './manage-form-input.css'


interface ManageFormInputProps {
    value: any;
    handleChange: (e: any) => void;
    label: string;
    isMandatory: boolean;
    id: string;
    type: string;
}

const ManageFormInput: React.FC<ManageFormInputProps> = ({handleChange, value, label, isMandatory, id, type}) => {
    return (
        <div className="flex items-center gap-[10px] manage_form_section">
            <label htmlFor="title" className="flex w-[150px] flex-shrink-0" style={{fontSize: '16px', fontWeight: 500 }}>
                <p className="m-0">{label}{isMandatory && <span style={{ color: 'red' }}>*</span>}</p>
            </label>
            <input 
                className="rounded-[5px] g-[40px] p-[5px] w-full max-w-[500px]" 
                style={{border: `1px solid ${ColorConstants.darkGrey}`, backgroundColor: ColorConstants.grey, fontSize: '14px'}} 
                type={type} 
                id={id} 
                name={id} 
                placeholder={`Enter the ${label}`}
                value={value} 
                onChange={handleChange} 
            />
        </div>
    )
}

export default ManageFormInput;