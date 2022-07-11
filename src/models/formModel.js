const { model, Schema } = require("mongoose");

const formSchema = new Schema({
    fields:[{
        birthday: {
            // label: "Date of Birth (YYYY-MM-DD)",
            type: Date,
            required: true,
            isReadOnly: false,
        },
        gestationalAge: {
            // label: "Gestational Age",
            type: Number,
            units: "weeks", 
            required: true,
            isReadOnly: false,
            trim: true,
        },
        sex: {
            // label: "Sex",
            items: [
                {
                  value: "male",
                  text: "Male"
                },
                {
                  value: "female",
                  text: "Female"
                }
            ],
            type: String,
            enum: ['Male', 'Female'],
            required: true,
            isReadOnly: false,
        },
        height: {
            // label: "Height",
            type: Number,
            units: "cm",  
            required: true,
            isReadOnly: false,
        },
        weight: {
            // label: "Weight",
            type: Number,
            units: "kg",  
            required: true,
            isReadOnly: false,
        }, 
        bmi: {
            // label: "BMI",
            type: Number,
            units: "kg/m^2",  
            isReadOnly: true,
        },
    }],
  },{strict: false}, { timestamps: true }
);

module.exports = model("Form", formSchema);