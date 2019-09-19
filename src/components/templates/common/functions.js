export const getDegreeFontSize = degreeText => {
    let stringLength = degreeText.length;

    if(stringLength <= 40)
    {
        return "35";
    }
    else if(stringLength > 40 && stringLength <= 60)
    {
        return 32;
    }
    return 30;
};