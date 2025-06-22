import ColorConstants from "../../../constants/ColorConstants";

interface ManageFormImageProps {
    value: any;
    label: string;
    isMandatory: boolean;
    id: string;
    type: string;
    newImageFile: File | null;
    setNewImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const ManageFormImage: React.FC<ManageFormImageProps> = ({ value, label, isMandatory, id, type, newImageFile, setNewImageFile}) => {
    const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File size exceeds 2 MB limit.');
                return;
            }
            setNewImageFile(file);
        }
    };


    return(
        <div className="flex gap-[10px] manage_form_section">
            <label htmlFor="title" className="flex w-[150px] flex-shrink-0" style={{fontSize: '16px', fontWeight: 500 }}>
                <p className="m-0">{label}{isMandatory && <span style={{ color: 'red' }}>*</span>}</p>
            </label>
            <div className="w-full flex flex-col gap-[10px]">
                <input 
                    className="rounded-[5px] g-[40px] p-[5px] w-full max-w-[500px]" 
                    style={{border: `1px solid ${ColorConstants.darkGrey}`, backgroundColor: ColorConstants.grey, fontSize: '14px'}} 
                    type={type} 
                    id={id} 
                    name={id} 
                    placeholder={`Upload ${label}`}
                    onChange={handleImgChange} 
                />
                {newImageFile === null && value !== null && (
                    <div className="w-[200px] h-[100px]">
                        <img src={`${process.env.REACT_APP_BE_URL}/${value.replace(/\\/g, '/')}`} className="w-full h-full object-cover"/>
                    </div>
                )}
                {newImageFile !== null && (
                    <div className="w-[200px] h-[100px]">
                        <img src={URL.createObjectURL(newImageFile)} className="w-full h-full object-cover" />
                    </div>
                )}
                {newImageFile && (<p style={{color: 'blue', cursor: 'pointer'}} onClick={() => setNewImageFile(null)}>Clear</p>)}
            </div>
        </div>
    )
}

export default ManageFormImage;