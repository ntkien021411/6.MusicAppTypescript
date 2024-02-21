import unidecode from "unidecode";

export const convertToSlug = (text:string) :string => {
    const unidecodeText:string = unidecode(text.trim());
    //Tìm khoảng trắng và replace thành dấu trừ
    const slug:string =unidecodeText.replace(/\s+/g, "-");
    
    return slug;

}