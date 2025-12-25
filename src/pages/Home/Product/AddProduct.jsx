import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUpload, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddProduct = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showOnHome, setShowOnHome] = useState(false);

    const availableQuantity = watch('availableQuantity') || 0;

    // Handle image selection
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 5) {
            toast.error('You can upload up to 5 images only');
            return;
        }
        const newImages = files.slice(0, 5 - images.length);
        setImages(prev => [...prev, ...newImages]);

        const newPreviews = newImages.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    // Remove image
    const removeImage = (index) => {
        // Revoke URL to free memory
        URL.revokeObjectURL(imagePreviews[index]);
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    // Upload images to ImgBB
    const uploadImagesToImgBB = async (imageFiles) => {
        const uploadPromises = imageFiles.map(async (file) => {
            const formData = new FormData();
            formData.append('image', file);
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );
            if (res.data.success) return res.data.data.url;
            throw new Error('Image upload failed');
        });
        return Promise.all(uploadPromises);
    };

    // Form submit
    const onSubmit = async (data) => {
        if (images.length === 0) {
            toast.error('Please upload at least one image');
            return;
        }

        setLoading(true);
        try {
            const uploadedImageUrls = await uploadImagesToImgBB(images);

            const productData = {
                productName: data.productName,
                description: data.description,
                category: data.category,
                price: parseFloat(data.price),
                availableQuantity: parseInt(data.availableQuantity),
                minimumOrder: parseInt(data.minimumOrder),
                images: uploadedImageUrls,
                demoVideo: data.demoVideo || '',
                paymentOptions: data.paymentOptions,
                showOnHome,
            };

            const res = await axios.post('https://garments-order-production-tracker-s-zeta.vercel.app/products', productData);

            if (res.data.insertedId) {
                toast.success('Product added successfully!');
                reset();
                images.forEach((_, i) => URL.revokeObjectURL(imagePreviews[i])); // revoke all URLs
                setImages([]);
                setImagePreviews([]);
                setShowOnHome(false);
            } else {
                toast.error('Something went wrong');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error occurred, please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen bg-gray-100 py-8 px-4">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Add New Product</h1>
                    <p className="text-gray-600 mb-10">Fill all details to add a new garment product</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <InputField
                                    label="Product Name *"
                                    placeholder="Premium Cotton T-Shirt"
                                    register={register}
                                    name="productName"
                                    rules={{ required: "Product name is required", minLength: { value: 3, message: "Minimum 3 characters" } }}
                                    error={errors.productName}
                                />

                                <SelectField
                                    label="Category *"
                                    name="category"
                                    register={register}
                                    options={['Shirt','Pant','Jacket','Dress','Skirt','Accessories']}
                                    error={errors.category}
                                />

                                <InputField
                                    label="Price (USD) *"
                                    type="number"
                                    step="0.01"
                                    placeholder="29.99"
                                    register={register}
                                    name="price"
                                    rules={{ required: "Price required", min: { value: 0.01, message: "Price > 0" } }}
                                    error={errors.price}
                                />

                                <InputField
                                    label="Available Quantity *"
                                    type="number"
                                    register={register}
                                    name="availableQuantity"
                                    rules={{ required: "Required", min: { value: 1, message: "Min 1" } }}
                                    error={errors.availableQuantity}
                                />

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Order Quantity *</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            {...register("minimumOrder", {
                                                required: "Required",
                                                min: { value: 1, message: "Min 1" },
                                                validate: value => value <= availableQuantity || "Cannot exceed available quantity"
                                            })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none
             text-black placeholder-gray-400"
                                            // className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                        <FaInfoCircle className="text-gray-900" title="Minimum quantity a buyer must order" />
                                    </div>
                                    {errors.minimumOrder && <p className="text-red-500 text-sm mt-1">{errors.minimumOrder.message}</p>}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                <SelectField
                                    label="Payment Options *"
                                    name="paymentOptions"
                                    register={register}
                                    options={['Cash on Delivery','Pay First','Both']}
                                    error={errors.paymentOptions}
                                />

                                <InputField
                                    label="Demo Video Link (Optional)"
                                    type="url"
                                    placeholder="https://youtube.com/watch?v=..."
                                    register={register}
                                    name="demoVideo"
                                />

                                <div className="flex items-center gap-4 p-5 bg-blue-50 rounded-lg">
                                    <input
                                        type="checkbox"
                                        id="showHome"
                                        checked={showOnHome}
                                        onChange={e => setShowOnHome(e.target.checked)}
                                        className="h-6 w-6 text-blue-600 rounded"
                                    />
                                    <label htmlFor="showHome" className="text-lg font-medium text-gray-800">
                                        Show on Home Page
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product Description *</label>
                                    <textarea
                                        rows="6"
                                        {...register("description", { required: "Required", minLength: { value: 20, message: "Min 20 characters" } })}
                                        className={`w-full  text-black placeholder-gray-400 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Detailed description..."
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <ImageUpload images={images} previews={imagePreviews} handleImageUpload={handleImageUpload} removeImage={removeImage} />

                        {/* Buttons */}
                        <div className="mt-12 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    reset();
                                    images.forEach((_, i) => URL.revokeObjectURL(imagePreviews[i]));
                                    setImages([]);
                                    setImagePreviews([]);
                                    setShowOnHome(false);
                                }}
                                className="px-8 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                                disabled={loading}
                            >
                                Clear
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-10 py-3 rounded-lg font-medium text-white transition ${
                                    loading ? 'bg-gray-500' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                                }`}
                            >
                                {loading ? 'Adding...' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

// --- Helper Components ---
const InputField = ({ label, type='text', placeholder='', register, name, rules={}, error }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            {...register(name, rules)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none 
                        text-black placeholder-gray-400
                        ${error ? 'border-red-500' : 'border-gray-300'}`}
            // className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
);

const SelectField = ({ label, register, name, options=[], error }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <select
            {...register(name, { required: "Required" })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none 
                        text-black placeholder-gray-400
                        ${error ? 'border-red-500' : 'border-gray-300'}`}
            // className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
            <option value="">Select {label}</option>
            {options.map((opt, i) => <option key={i}>{opt}</option>)}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
);

const ImageUpload = ({ images, previews, handleImageUpload, removeImage }) => (
    <div className="mt-10">
        <label className="block text-sm font-semibold text-gray-700 mb-4">
            Product Images * (Max 5)
        </label>
        <div className="border-4 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-blue-500 transition">
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imgUpload"
            />
            <label htmlFor="imgUpload" className="cursor-pointer">
                <FaUpload className="mx-auto text-5xl text-gray-400 mb-4" />
                <p className="text-xl text-gray-600">Click to upload or drag & drop</p>
                <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 5MB</p>
            </label>
        </div>

        {previews.length > 0 && (
            <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Preview ({previews.length}/5)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {previews.map((preview, idx) => (
                        <div key={idx} className="relative group">
                            <img src={preview} alt="preview" className="w-full h-40 object-cover rounded-lg shadow-lg" />
                            <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);

export default AddProduct;
