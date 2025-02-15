import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company Name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }
    company = await Company.create({
      companyName: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company created successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.findOne({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "No companies found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      message: "Companies found",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      message: "Company found",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      message: "Company updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
